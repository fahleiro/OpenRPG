import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface para representar um item do banco de dados
 */
export interface Item {
  id: number;
  name: string;
  type: number;
  description: string;
}

/**
 * Serviço para gerenciar o banco de dados local JSON
 * 
 * @description Este serviço é responsável por ler e gerenciar os dados
 * armazenados em arquivos JSON locais, substituindo o Firebase.
 */
export class LocalDatabaseService {
  private readonly dbPath: string;

  constructor() {
    this.dbPath = path.join(__dirname, 'item');
  }

  /**
   * Busca todos os itens do banco de dados local
   * 
   * @returns Promise<Item[]> - Array com todos os itens encontrados
   */
  async getAllItems(): Promise<Item[]> {
    try {
      const items: Item[] = [];
      
      // Lê todos os diretórios de tipos de itens
      const typeDirectories = fs.readdirSync(this.dbPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const typeDir of typeDirectories) {
        const typePath = path.join(this.dbPath, typeDir);
        
        // Verifica se é um diretório com subdiretórios (como cons/1/)
        const subDirs = fs.readdirSync(typePath, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);

        if (subDirs.length > 0) {
          // Estrutura com subdiretórios (cons/1/1.json)
          for (const subDir of subDirs) {
            const subPath = path.join(typePath, subDir);
            const jsonFiles = fs.readdirSync(subPath)
              .filter(file => file.endsWith('.json'));

            for (const jsonFile of jsonFiles) {
              const filePath = path.join(subPath, jsonFile);
              const item = this.readItemFromFile(filePath);
              if (item) {
                items.push(item);
              }
            }
          }
        } else {
          // Estrutura direta (misc/3.json)
          const jsonFiles = fs.readdirSync(typePath)
            .filter(file => file.endsWith('.json'));

          for (const jsonFile of jsonFiles) {
            const filePath = path.join(typePath, jsonFile);
            const item = this.readItemFromFile(filePath);
            if (item) {
              items.push(item);
            }
          }
        }
      }

      // Ordena por ID para manter consistência
      return items.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Erro ao ler itens do banco local:', error);
      throw new Error('Falha ao carregar itens do banco de dados local');
    }
  }

  /**
   * Busca um item específico pelo ID
   * 
   * @param id - ID do item a ser buscado
   * @returns Promise<Item | null> - Item encontrado ou null se não existir
   */
  async getItemById(id: number): Promise<Item | null> {
    try {
      const items = await this.getAllItems();
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar item por ID:', error);
      throw new Error('Falha ao buscar item no banco de dados local');
    }
  }

  /**
   * Lê um item de um arquivo JSON específico
   * 
   * @param filePath - Caminho para o arquivo JSON
   * @returns Item | null - Item lido ou null se houver erro
   */
  private readItemFromFile(filePath: string): Item | null {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const item = JSON.parse(fileContent) as Item;
      
      // Valida se o item tem os campos obrigatórios
      if (this.isValidItem(item)) {
        return item;
      } else {
        console.warn(`Item inválido encontrado em ${filePath}:`, item);
        return null;
      }
    } catch (error) {
      console.error(`Erro ao ler arquivo ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Valida se um item tem a estrutura correta
   * 
   * @param item - Item a ser validado
   * @returns boolean - true se válido, false caso contrário
   */
  private isValidItem(item: any): item is Item {
    return (
      typeof item === 'object' &&
      typeof item.id === 'number' &&
      typeof item.name === 'string' &&
      typeof item.type === 'number' &&
      typeof item.description === 'string'
    );
  }
}

// Instância singleton do serviço
export const localDatabaseService = new LocalDatabaseService();
