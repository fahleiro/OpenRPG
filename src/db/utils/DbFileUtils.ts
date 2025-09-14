import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Utilitário para manipulação de arquivos JSON do sistema
 * 
 * @description Esta classe fornece métodos para ler e manipular
 * arquivos JSON que armazenam dados do jogo, como itens, personagens, etc.
 * Centraliza a lógica de acesso a arquivos para manter consistência.
 */
export class DbFileUtils {
  /** Caminho base para os arquivos de dados */
  private static readonly DATA_PATH = path.join(__dirname, '..');

  /**
   * Recupera todos os itens do sistema
   * 
   * @description Lê todos os arquivos JSON na pasta items e retorna
   * uma lista consolidada de todos os itens disponíveis no sistema.
   * 
   * @returns Promise<any[]> Array com todos os itens encontrados
   * @throws Error se houver problemas na leitura dos arquivos
   */
  static async getAllItems(): Promise<any[]> {
    try {
      const itemsPath = path.join(this.DATA_PATH, 'items');
      
      // Verifica se o diretório de itens existe
      await fs.access(itemsPath);
      
      // Lista todos os arquivos JSON no diretório
      const files = await fs.readdir(itemsPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      // Lê e parseia cada arquivo JSON
      const items: any[] = [];
      for (const file of jsonFiles) {
        const filePath = path.join(itemsPath, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const item = JSON.parse(fileContent);
        items.push(item);
      }
      
      // Ordena os itens por ID para consistência
      return items.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
      throw new Error('Falha ao carregar itens do sistema');
    }
  }

  /**
   * Busca um item específico pelo ID
   * 
   * @description Procura por um arquivo JSON correspondente ao ID fornecido
   * na pasta de itens e retorna o item se encontrado.
   * 
   * @param id - ID do item a ser buscado
   * @returns Promise<any | null> Item encontrado ou null se não existir
   * @throws Error se houver problemas na leitura do arquivo
   */
  static async getItemById(id: number): Promise<any | null> {
    try {
      const itemPath = path.join(this.DATA_PATH, 'items', `${id}.json`);
      
      // Verifica se o arquivo existe
      await fs.access(itemPath);
      
      // Lê e parseia o arquivo JSON
      const fileContent = await fs.readFile(itemPath, 'utf-8');
      const item = JSON.parse(fileContent);
      
      return item;
    } catch (error) {
      // Se o arquivo não existir, retorna null
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      
      console.error(`Erro ao carregar item ${id}:`, error);
      throw new Error(`Falha ao carregar item com ID ${id}`);
    }
  }

  /**
   * Verifica se um item existe pelo ID
   * 
   * @description Método utilitário para verificar rapidamente se um item
   * existe no sistema sem precisar carregar seus dados completos.
   * 
   * @param id - ID do item a ser verificado
   * @returns Promise<boolean> true se o item existir, false caso contrário
   */
  static async itemExists(id: number): Promise<boolean> {
    try {
      const itemPath = path.join(this.DATA_PATH, 'items', `${id}.json`);
      await fs.access(itemPath);
      return true;
    } catch {
      return false;
    }
  }
}

