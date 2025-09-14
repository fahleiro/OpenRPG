import { promises as fs } from 'fs';
import path from 'path';

export interface ServerConfig {
  SERVER_HOST: string;
  SERVER_PORT: number;
  NODE_ENV: string;
  CORS_ORIGIN: string;
  CORS_METHODS: string;
  CORS_HEADERS: string;
  LOG_LEVEL: string;
  LOG_FORMAT: string;
  REQUEST_TIMEOUT: number;
  RATE_LIMIT_WINDOW: number;
  RATE_LIMIT_MAX_REQUESTS: number;
}

export class ConfigUtils {
  private static config: ServerConfig | null = null;
  private static readonly CONFIG_FILE = path.join(process.cwd(), 'server.conf');

  /**
   * Carrega as configurações do arquivo server.conf
   */
  static async loadConfig(): Promise<ServerConfig> {
    if (this.config) {
      return this.config;
    }

    try {
      const configContent = await fs.readFile(this.CONFIG_FILE, 'utf-8');
      const parsedConfig = this.parseConfigFile(configContent);
      
      // Validação e conversão de tipos
      this.config = {
        SERVER_HOST: parsedConfig.SERVER_HOST || 'localhost',
        SERVER_PORT: parseInt(parsedConfig.SERVER_PORT || '3000'),
        NODE_ENV: parsedConfig.NODE_ENV || 'development',
        CORS_ORIGIN: parsedConfig.CORS_ORIGIN || '*',
        CORS_METHODS: parsedConfig.CORS_METHODS || 'GET,POST,PUT,DELETE,OPTIONS',
        CORS_HEADERS: parsedConfig.CORS_HEADERS || 'Content-Type,Authorization',
        LOG_LEVEL: parsedConfig.LOG_LEVEL || 'info',
        LOG_FORMAT: parsedConfig.LOG_FORMAT || 'combined',
        REQUEST_TIMEOUT: parseInt(parsedConfig.REQUEST_TIMEOUT || '30000'),
        RATE_LIMIT_WINDOW: parseInt(parsedConfig.RATE_LIMIT_WINDOW || '900000'),
        RATE_LIMIT_MAX_REQUESTS: parseInt(parsedConfig.RATE_LIMIT_MAX_REQUESTS || '100')
      };

      console.log('✅ Configurações carregadas do server.conf');
      return this.config;
    } catch (error) {
      console.warn('⚠️  Erro ao carregar server.conf, usando configurações padrão:', error);
      
      // Configurações padrão caso o arquivo não exista
      this.config = {
        SERVER_HOST: 'localhost',
        SERVER_PORT: 3000,
        NODE_ENV: 'development',
        CORS_ORIGIN: '*',
        CORS_METHODS: 'GET,POST,PUT,DELETE,OPTIONS',
        CORS_HEADERS: 'Content-Type,Authorization',
        LOG_LEVEL: 'info',
        LOG_FORMAT: 'combined',
        REQUEST_TIMEOUT: 30000,
        RATE_LIMIT_WINDOW: 900000,
        RATE_LIMIT_MAX_REQUESTS: 100
      };

      return this.config;
    }
  }

  /**
   * Faz o parsing do arquivo de configuração
   */
  private static parseConfigFile(content: string): Record<string, string> {
    const config: Record<string, string> = {};
    
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Ignora linhas vazias e comentários
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }
      
      // Processa linhas no formato KEY=VALUE
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        const value = trimmedLine.substring(equalIndex + 1).trim();
        config[key] = value;
      }
    }
    
    return config;
  }

  /**
   * Retorna a configuração atual (deve ser chamado após loadConfig)
   */
  static getConfig(): ServerConfig {
    if (!this.config) {
      throw new Error('Configuração não foi carregada. Chame loadConfig() primeiro.');
    }
    return this.config;
  }

  /**
   * Recarrega as configurações do arquivo
   */
  static async reloadConfig(): Promise<ServerConfig> {
    this.config = null;
    return await this.loadConfig();
  }

  /**
   * Verifica se o arquivo de configuração existe
   */
  static async configFileExists(): Promise<boolean> {
    try {
      await fs.access(this.CONFIG_FILE);
      return true;
    } catch {
      return false;
    }
  }
}
