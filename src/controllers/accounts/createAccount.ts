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
    console.log('🔍 [CREATE_ACCOUNT] Iniciando criação de conta');
    console.log('📥 [CREATE_ACCOUNT] Body recebido:', JSON.stringify(req.body, null, 2));
    
    const { username, passwrod } = req.body;

    // === VALIDAÇÃO DE DADOS ===
    
    // Validação básica dos campos obrigatórios
    if (!username || !passwrod) {
      console.log('❌ [CREATE_ACCOUNT] Campos obrigatórios ausentes:', { username: !!username, passwrod: !!passwrod });
      res.status(400).json({
        success: false,
        error: 'Dados incompletos',
        message: 'Username e password são obrigatórios',
        required: ['username', 'passwrod']
      });
      return;
    }
    
    console.log('✅ [CREATE_ACCOUNT] Campos obrigatórios validados');

    // Validação de username (mínimo 3 caracteres, apenas letras, números e underscore)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      console.log('❌ [CREATE_ACCOUNT] Username inválido:', username);
      res.status(400).json({
        success: false,
        error: 'Username inválido',
        message: 'Username deve ter entre 3-20 caracteres (letras, números e underscore apenas)'
      });
      return;
    }
    console.log('✅ [CREATE_ACCOUNT] Username válido:', username);

    // Validação de senha (mínimo 6 caracteres)
    if (passwrod.length < 6) {
      console.log('❌ [CREATE_ACCOUNT] Senha muito curta:', passwrod.length, 'caracteres');
      res.status(400).json({
        success: false,
        error: 'Senha muito curta',
        message: 'Senha deve ter pelo menos 6 caracteres'
      });
      return;
    }
    console.log('✅ [CREATE_ACCOUNT] Senha válida:', passwrod.length, 'caracteres');

    // === VERIFICAÇÃO DE DUPLICATAS NO FIRESTORE ===
    
    console.log('🔍 [CREATE_ACCOUNT] Verificando se username já existe...');
    const usernameExists = await firebaseService.usernameExists(username);
    if (usernameExists) {
      console.log('❌ [CREATE_ACCOUNT] Username já existe:', username);
      res.status(409).json({
        success: false,
        error: 'Username já existe',
        message: 'Este username já está em uso'
      });
      return;
    }
    console.log('✅ [CREATE_ACCOUNT] Username disponível:', username);

    // === PROCESSAMENTO E SALVAMENTO ===
    
    console.log('🔐 [CREATE_ACCOUNT] Gerando hash da senha...');
    const salt = process.env.PASSWORD_SALT || 'openrpg_salt';
    console.log('🧂 [CREATE_ACCOUNT] Salt usado:', salt ? 'definido' : 'padrão');
    
    const hashedPassword = crypto
      .createHash('sha256')
      .update(passwrod + salt)
      .digest('hex');
    
    console.log('✅ [CREATE_ACCOUNT] Hash gerado com sucesso');

    console.log('💾 [CREATE_ACCOUNT] Salvando conta no Firebase...');
    const accountId = await firebaseService.saveAccount(username, hashedPassword);
    console.log('✅ [CREATE_ACCOUNT] Conta salva com ID:', accountId);

    // Resposta de sucesso
    const responseData = {
      success: true,
      message: 'Conta criada com sucesso!',
      data: {
        accountId,
        username,
        createdAt: new Date().toISOString()
      }
    };
    
    console.log('📤 [CREATE_ACCOUNT] Enviando resposta de sucesso:', JSON.stringify(responseData, null, 2));
    res.status(201).json(responseData);

  } catch (error) {
    console.error('💥 [CREATE_ACCOUNT] ERRO CRÍTICO:', error);
    console.error('💥 [CREATE_ACCOUNT] Stack trace:', error instanceof Error ? error.stack : 'N/A');
    console.error('💥 [CREATE_ACCOUNT] Tipo do erro:', typeof error);
    console.error('💥 [CREATE_ACCOUNT] Mensagem do erro:', error instanceof Error ? error.message : String(error));
    
    const errorResponse = {
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível processar o cadastro',
      debug: {
        errorType: typeof error,
        errorMessage: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      }
    };
    
    console.log('📤 [CREATE_ACCOUNT] Enviando resposta de erro:', JSON.stringify(errorResponse, null, 2));
    res.status(500).json(errorResponse);
  }
};
