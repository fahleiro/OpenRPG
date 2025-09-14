import { Request, Response } from 'express';
import { firebaseService } from './firebaseService';
import crypto from 'crypto';

/**
 * Controller para criar nova conta de usuário
 * Endpoint: POST /api/accounts
 * 
 * @description Este controller valida os dados recebidos (username e password),
 * verifica duplicatas no Firestore e salva a conta diretamente no banco.
 * 
 * Fluxo:
 * 1. Valida formato dos dados recebidos (username e password)
 * 2. Verifica se username já existe no Firestore
 * 3. Gera hash da senha
 * 4. Salva diretamente no Firestore
 * 
 * @param req - Objeto Request do Express
 * @param res - Objeto Response do Express
 * @returns Promise<void>
 */
export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, passwrod } = req.body;

    // === VALIDAÇÃO DE DADOS ===
    
    // Validação básica dos campos obrigatórios
    if (!username || !passwrod) {
      res.status(400).json({
        success: false,
        error: 'Dados incompletos',
        message: 'Username e password são obrigatórios',
        required: ['username', 'passwrod']
      });
      return;
    }

    // Validação de username (mínimo 3 caracteres, apenas letras, números e underscore)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      res.status(400).json({
        success: false,
        error: 'Username inválido',
        message: 'Username deve ter entre 3-20 caracteres (letras, números e underscore apenas)'
      });
      return;
    }

    // Validação de senha (mínimo 6 caracteres)
    if (passwrod.length < 6) {
      res.status(400).json({
        success: false,
        error: 'Senha muito curta',
        message: 'Senha deve ter pelo menos 6 caracteres'
      });
      return;
    }

    // === VERIFICAÇÃO DE DUPLICATAS NO FIRESTORE ===
    
    // Verifica se username já existe no Firebase
    const usernameExists = await firebaseService.usernameExists(username);
    if (usernameExists) {
      res.status(409).json({
        success: false,
        error: 'Username já existe',
        message: 'Este username já está em uso'
      });
      return;
    }

    // === PROCESSAMENTO E SALVAMENTO ===
    
    // Hash da senha antes de salvar no Firebase
    const hashedPassword = crypto
      .createHash('sha256')
      .update(passwrod + (process.env.PASSWORD_SALT || 'openrpg_salt'))
      .digest('hex');

    // Salva a conta diretamente no Firebase
    const accountId = await firebaseService.saveAccount(username, hashedPassword);

    // Resposta de sucesso
    res.status(201).json({
      success: true,
      message: 'Conta criada com sucesso!',
      data: {
        accountId,
        username,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erro no createAccount:', error);
    
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível processar o cadastro'
    });
  }
};
