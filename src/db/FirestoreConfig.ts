// @ts-ignore - Firebase Admin SDK types are included in the package
import admin from 'firebase-admin';

/**
 * Configuração do Firebase Firestore para servidor Node.js
 * 
 * @description Centraliza a configuração e inicialização do Firebase Admin SDK
 * usando as variáveis de ambiente do projeto. Baseado no guia oficial do Firestore.
 * 
 * @see https://firebase.google.com/docs/firestore/quickstart
 */

class FirestoreConfig {
  private static instance: FirestoreConfig;
  private db: admin.firestore.Firestore | null = null;
  private initialized = false;

  private constructor() {
    this.initializeFirestore();
  }

  /**
   * Singleton pattern para garantir uma única instância da configuração
   * 
   * @returns FirestoreConfig - Instância única da configuração
   */
  public static getInstance(): FirestoreConfig {
    if (!FirestoreConfig.instance) {
      FirestoreConfig.instance = new FirestoreConfig();
    }
    return FirestoreConfig.instance;
  }

  /**
   * Inicializa o Firebase Admin SDK com as configurações do ambiente
   * 
   * @description Configura o Firebase usando as variáveis de ambiente
   * disponíveis no arquivo .env do projeto.
   */
  private initializeFirestore(): void {
    try {
      if (!this.initialized) {
        // Configuração do Firebase usando variáveis de ambiente
        const firebaseConfig = {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };

        // Validação das variáveis obrigatórias
        if (!firebaseConfig.projectId) {
          throw new Error('FIREBASE_PROJECT_ID não está definido nas variáveis de ambiente');
        }

        // Para servidor Node.js, usamos o Firebase Admin SDK
        // Inicializa com as credenciais padrão do Google Cloud ou service account
        if (!admin.apps.length) {
          admin.initializeApp({
            projectId: firebaseConfig.projectId,
            // Se houver service account key, pode ser adicionado aqui
            // credential: admin.credential.cert(serviceAccountKey)
          });
        }

        this.db = admin.firestore();
        this.initialized = true;
        
        console.log('✅ Firestore inicializado com sucesso');
        console.log(`📊 Projeto: ${firebaseConfig.projectId}`);
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar Firestore:', error);
      throw new Error(`Falha na inicialização do Firestore: ${error}`);
    }
  }

  /**
   * Retorna a instância do Firestore Database
   * 
   * @returns admin.firestore.Firestore - Instância do Firestore
   * @throws Error se o Firestore não foi inicializado
   */
  public getDatabase(): admin.firestore.Firestore {
    if (!this.db) {
      throw new Error('Firestore não foi inicializado corretamente');
    }
    return this.db;
  }

  /**
   * Verifica se o Firestore foi inicializado com sucesso
   * 
   * @returns boolean - true se inicializado, false caso contrário
   */
  public isInitialized(): boolean {
    return this.initialized && this.db !== null;
  }

  /**
   * Testa a conexão com o Firestore
   * 
   * @returns Promise<boolean> - true se conectado, false caso contrário
   */
  public async testConnection(): Promise<boolean> {
    try {
      if (!this.db) {
        return false;
      }

      // Tenta fazer uma operação simples para testar a conexão
      await this.db.collection('_test_connection').limit(1).get();
      console.log('✅ Conexão com Firestore verificada');
      return true;
    } catch (error) {
      console.error('❌ Erro na conexão com Firestore:', error);
      return false;
    }
  }

  /**
   * Obtém informações sobre a configuração atual
   * 
   * @returns object - Informações da configuração (sem dados sensíveis)
   */
  public getConfigInfo(): object {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      initialized: this.initialized,
      hasDatabase: this.db !== null
    };
  }
}

// Exporta a instância única da configuração
export const firestoreConfig = FirestoreConfig.getInstance();

// Exporta também a classe para casos específicos
export { FirestoreConfig };
