import { Request, Response } from 'express';
import { FileUtils } from '../utils/fileUtils';
import { Item } from '../types/Item';

export class ItemController {
  /**
   * GET /items - Lista todos os itens
   */
  static async getAllItems(req: Request, res: Response): Promise<void> {
    try {
      const items: Item[] = await FileUtils.getAllItems();
      
      res.status(200).json({
        success: true,
        data: items,
        count: items.length,
        message: 'Itens carregados com sucesso'
      });
    } catch (error) {
      console.error('Erro no ItemController.getAllItems:', error);
      
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível carregar os itens'
      });
    }
  }

  /**
   * GET /items/:id - Busca um item específico pelo ID
   */
  static async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          success: false,
          error: 'ID inválido',
          message: 'O ID deve ser um número positivo'
        });
        return;
      }

      const item = await FileUtils.getItemById(id);
      
      if (!item) {
        res.status(404).json({
          success: false,
          error: 'Item não encontrado',
          message: `Item com ID ${id} não existe`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: item,
        message: 'Item encontrado com sucesso'
      });
    } catch (error) {
      console.error('Erro no ItemController.getItemById:', error);
      
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível carregar o item'
      });
    }
  }
}
