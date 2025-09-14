import { Request, Response } from 'express';
import { firestoreConfig } from '../../db/FirestoreConfig';

/**
 * Controller para listar todos os itens disponíveis
 * Endpoint: GET /items
 * 
 * @description Este controller é responsável por recuperar todos os itens
 * do sistema através do Firestore Database e retornar uma resposta padronizada
 * com os dados, contagem e mensagem de sucesso.
 * 
 * @param req - Objeto Request do Express
 * @param res - Objeto Response do Express
 * @returns Promise<void>
 */
export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 [GET_ALL_ITEMS] Iniciando busca de todos os itens...');
    
    // Obtém instância do Firestore
    const db = firestoreConfig.getDatabase();
    
    // Busca todos os itens na coleção 'items'
    const snapshot = await db.collection('items').get();
    
    if (snapshot.empty) {
      console.log('📭 [GET_ALL_ITEMS] Nenhum item encontrado');
      res.status(200).json({
        success: true,
        data: [],
        count: 0,
        message: 'Nenhum item encontrado'
      });
      return;
    }

    // Processa os documentos encontrados
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        typeId: data.typeId
      };
    });

    // Ordena por ID para manter consistência
    items.sort((a, b) => a.id - b.id);
    
    console.log(`✅ [GET_ALL_ITEMS] ${items.length} itens encontrados`);
    
    // Retorna resposta de sucesso com os dados
    res.status(200).json({
      success: true,
      data: items,
      count: items.length,
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
