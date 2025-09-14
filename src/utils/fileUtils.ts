import { promises as fs } from 'fs';
import path from 'path';
import { Item } from '../types/Item';

export class FileUtils {
  private static readonly ITEMS_DIR = path.join(__dirname, '../db/items');

  /**
   * Lê todos os arquivos JSON da pasta de itens
   */
  static async getAllItems(): Promise<Item[]> {
    try {
      const files = await fs.readdir(this.ITEMS_DIR);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      const items: Item[] = [];
      
      for (const file of jsonFiles) {
        const filePath = path.join(this.ITEMS_DIR, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const item: Item = JSON.parse(fileContent);
        items.push(item);
      }
      
      // Ordena por ID para manter consistência
      return items.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Erro ao ler itens:', error);
      throw new Error('Falha ao carregar itens do banco de dados');
    }
  }

  /**
   * Lê um item específico pelo ID
   */
  static async getItemById(id: number): Promise<Item | null> {
    try {
      const filePath = path.join(this.ITEMS_DIR, `${id}.json`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      console.error(`Erro ao ler item ${id}:`, error);
      throw new Error(`Falha ao carregar item ${id}`);
    }
  }

  /**
   * Verifica se a pasta de itens existe
   */
  static async ensureItemsDirectory(): Promise<void> {
    try {
      await fs.access(this.ITEMS_DIR);
    } catch {
      await fs.mkdir(this.ITEMS_DIR, { recursive: true });
    }
  }
}
