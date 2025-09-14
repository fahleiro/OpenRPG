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
      console.log('🔧 [FIRESTORE_CONFIG] Iniciando inicialização do Firestore');
      
      if (!this.initialized) {
        const firebaseConfig = {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };
  
        console.log('🔍 [FIRESTORE_CONFIG] Variáveis de ambiente carregadas:', {
          projectId: firebaseConfig.projectId ? 'definida' : 'não definida',
          serviceAccountKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? 'definida' : 'não definida'
        });
  
        if (!firebaseConfig.projectId) {
          throw new Error('FIREBASE_PROJECT_ID não está definido');
        }
  
        if (!admin.apps.length) {
          console.log('🚀 [FIRESTORE_CONFIG] Inicializando Firebase Admin SDK...');
          
          const appConfig: any = {
            projectId: firebaseConfig.projectId
          };
  
          // Configuração com Service Account Key
          if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            console.log('🔑 [FIRESTORE_CONFIG] Usando Service Account Key');
            try {
              const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
              appConfig.credential = admin.credential.cert(serviceAccount);
              console.log('✅ [FIRESTORE_CONFIG] Service Account configurada');
            } catch (parseError) {
              console.error('💥 [FIRESTORE_CONFIG] Erro ao parsear Service Account Key:', parseError);
              throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY inválida');
            }
          } else {
            console.log('⚠️ [FIRESTORE_CONFIG] Service Account Key não encontrada - usando credenciais padrão');
          }
  
          admin.initializeApp(appConfig);
          console.log('✅ [FIRESTORE_CONFIG] Firebase Admin SDK inicializado');
        }
  
        this.db = admin.firestore();
        this.initialized = true;
        
        console.log('✅ [FIRESTORE_CONFIG] Firestore inicializado com sucesso');
        console.log(`📊 [FIRESTORE_CONFIG] Projeto: ${firebaseConfig.projectId}`);
      }
    } catch (error) {
      console.error('💥 [FIRESTORE_CONFIG] ERRO ao inicializar Firestore:', error);
      throw new Error(`Falha na inicialização do Firestore: ${error instanceof Error ? error.message : String(error)}`);
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
