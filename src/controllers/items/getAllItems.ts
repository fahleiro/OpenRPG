import { Request, Response } from 'express';
import { DbFileUtils } from '../../db/utils/DbFileUtils';

/**
 * Controller para listar todos os itens disponíveis
 * Endpoint: GET /items
 * 
 * @description Este controller é responsável por recuperar todos os itens
 * do sistema através do DbFileUtils e retornar uma resposta padronizada
 * com os dados, contagem e mensagem de sucesso.
 * 
 * @param req - Objeto Request do Express
 * @param res - Objeto Response do Express
 * @returns Promise<void>
 */
export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    // Recupera todos os itens através do DbFileUtils
    const items = await DbFileUtils.getAllItems();
    
    // Retorna resposta de sucesso com os dados
    res.status(200).json({
      success: true,
      data: items,
      count: items.length,
      message: 'Itens carregados com sucesso'
    });
  } catch (error) {
    // Log do erro para debugging
    console.error('Erro no getAllItems:', error);
    
    // Retorna resposta de erro padronizada
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível carregar os itens'
    });
  }
};
