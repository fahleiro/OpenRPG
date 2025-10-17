import { Request, Response } from 'express';
import { localDatabaseService } from '../../db/LocalDatabaseService';

/**
 * Controller para listar todos os itens disponíveis
 * Endpoint: GET /items
 * 
 * @description Este controller é responsável por recuperar todos os itens
 * do sistema através do banco de dados local JSON e retornar uma resposta padronizada
 * com os dados, contagem e mensagem de sucesso.
 * 
 * @param req - Objeto Request do Express
 * @param res - Objeto Response do Express
 * @returns Promise<void>
 */
export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 [GET_ALL_ITEMS] Iniciando busca de todos os itens...');
    
    // Busca todos os itens no banco de dados local
    const items = await localDatabaseService.getAllItems();
    
    if (items.length === 0) {
      console.log('📭 [GET_ALL_ITEMS] Nenhum item encontrado');
      res.status(200).json({
        success: true,
        data: [],
        count: 0,
        message: 'Nenhum item encontrado'
      });
      return;
    }

    // Mapeia os itens para o formato de resposta
    const formattedItems = items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      typeId: item.type
    }));
    
    console.log(`✅ [GET_ALL_ITEMS] ${formattedItems.length} itens encontrados`);
    
    // Retorna resposta de sucesso com os dados
    res.status(200).json({
      success: true,
      data: formattedItems,
      count: formattedItems.length,
      message: 'Itens carregados com sucesso'
    });
  } catch (error) {
    // Log do erro para debugging
    console.error('💥 [GET_ALL_ITEMS] ERRO:', error);
    console.error('💥 [GET_ALL_ITEMS] Stack trace:', error instanceof Error ? error.stack : 'N/A');
    
    // Retorna resposta de erro padronizada
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível carregar os itens'
    });
  }
};
