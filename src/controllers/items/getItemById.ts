import { Request, Response } from 'express';
import { DbFileUtils } from '../../db/utils/DbFileUtils';

/**
 * Controller para buscar um item específico pelo ID
 * Endpoint: GET /items/:id
 * 
 * @description Este controller é responsável por recuperar um item específico
 * baseado no ID fornecido como parâmetro da rota. Inclui validação do ID
 * e tratamento de casos onde o item não é encontrado.
 * 
 * @param req - Objeto Request do Express (contém req.params.id)
 * @param res - Objeto Response do Express
 * @returns Promise<void>
 */
export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extrai e converte o ID do parâmetro da rota
    const id = parseInt(req.params.id || '0');
    
    // Validação do ID fornecido
    if (isNaN(id) || id <= 0) {
      res.status(400).json({
        success: false,
        error: 'ID inválido',
        message: 'O ID deve ser um número positivo'
      });
      return;
    }

    // Busca o item pelo ID através do DbFileUtils
    const item = await DbFileUtils.getItemById(id);
    
    // Verifica se o item foi encontrado
    if (!item) {
      res.status(404).json({
        success: false,
        error: 'Item não encontrado',
        message: `Item com ID ${id} não existe`
      });
      return;
    }

    // Retorna o item encontrado
    res.status(200).json({
      success: true,
      data: item,
      message: 'Item encontrado com sucesso'
    });
  } catch (error) {
    // Log do erro para debugging
    console.error('Erro no getItemById:', error);
    
    // Retorna resposta de erro padronizada
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível carregar o item'
    });
  }
};
