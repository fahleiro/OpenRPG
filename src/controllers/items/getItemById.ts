import { Request, Response } from 'express';
import { localDatabaseService } from '../../db/LocalDatabaseService';

/**
 * Controller para buscar um item específico pelo ID
 * Endpoint: GET /items/:id
 * 
 * @description Este controller é responsável por recuperar um item específico
 * baseado no ID fornecido como parâmetro da rota através do banco de dados local JSON.
 * Inclui validação do ID e tratamento de casos onde o item não é encontrado.
 * 
 * @param req - Objeto Request do Express (contém req.params.id)
 * @param res - Objeto Response do Express
 * @returns Promise<void>
 */
export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 [GET_ITEM_BY_ID] Iniciando busca de item por ID...');
    
    // Extrai e converte o ID do parâmetro da rota
    const id = parseInt(req.params.id || '0');
    
    console.log(`🔍 [GET_ITEM_BY_ID] ID solicitado: ${id}`);
    
    // Validação do ID fornecido
    if (isNaN(id) || id <= 0) {
      console.log('❌ [GET_ITEM_BY_ID] ID inválido:', req.params.id);
      res.status(400).json({
        success: false,
        error: 'ID inválido',
        message: 'O ID deve ser um número positivo'
      });
      return;
    }

    // Busca o item pelo ID no banco de dados local
    const item = await localDatabaseService.getItemById(id);

    if (!item) {
      console.log(`❌ [GET_ITEM_BY_ID] Item com ID ${id} não encontrado`);
      res.status(404).json({
        success: false,
        error: 'Item não encontrado',
        message: `Item com ID ${id} não existe`
      });
      return;
    }

    // Formata o item para o formato de resposta
    const formattedItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      typeId: item.type
    };

    console.log(`✅ [GET_ITEM_BY_ID] Item encontrado: ${formattedItem.name}`);
    
    // Retorna o item encontrado
    res.status(200).json({
      success: true,
      data: formattedItem,
      message: 'Item encontrado com sucesso'
    });
  } catch (error) {
    // Log do erro para debugging
    console.error('💥 [GET_ITEM_BY_ID] ERRO:', error);
    console.error('💥 [GET_ITEM_BY_ID] Stack trace:', error instanceof Error ? error.stack : 'N/A');
    
    // Retorna resposta de erro padronizada
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível carregar o item'
    });
  }
};
