// @ts-ignore - Firebase Admin SDK types are included in the package
import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

/**
 * Configuração centralizada do Firebase Firestore
 * 
 * @description Gerencia a inicialização e configuração do Firebase Admin SDK
 * para operações com o Firestore Database.
 */
class FirestoreConfig {
  private db: admin.firestore.Firestore | null = null;
  private initialized: boolean = false;

  constructor() {
    this.initializeFirebase();
  }

  /**
   * Inicializa o Firebase Admin SDK
   * 
   * @description Configura o Firebase Admin SDK usando as credenciais
   * do projeto definidas nas variáveis de ambiente.
   */
  private initializeFirebase(): void {
    try {
      console.log('🔥 [FIRESTORE_CONFIG] Inicializando Firebase Admin SDK...');
      
      // Verifica se já foi inicializado
      if (admin.apps.length > 0) {
        console.log('✅ [FIRESTORE_CONFIG] Firebase já inicializado');
        this.db = admin.firestore();
        this.initialized = true;
        return;
      }

      // Configuração do Firebase usando variáveis de ambiente
      const firebaseConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      };

      console.log('📋 [FIRESTORE_CONFIG] Configuração Firebase:', {
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket
      });

      // Prepara as credenciais do Service Account
      let credential;
      
      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        console.log('🔑 [FIRESTORE_CONFIG] Usando Service Account Key do .env');
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        credential = admin.credential.cert(serviceAccount);
      } else {
        console.log('🔑 [FIRESTORE_CONFIG] Tentando usar Application Default Credentials');
        credential = admin.credential.applicationDefault();
      }

      // Inicializa o Firebase Admin SDK
      admin.initializeApp({
        credential,
        ...firebaseConfig
      });

      // Obtém instância do Firestore
      this.db = admin.firestore();
      this.initialized = true;

      console.log('✅ [FIRESTORE_CONFIG] Firebase inicializado com sucesso');
      console.log('✅ [FIRESTORE_CONFIG] Firestore database conectado');

    } catch (error) {
      console.error('💥 [FIRESTORE_CONFIG] ERRO ao inicializar Firebase:', error);
      console.error('💥 [FIRESTORE_CONFIG] Stack trace:', error instanceof Error ? error.stack : 'N/A');
      throw new Error(`Falha ao inicializar Firebase: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Retorna a instância do Firestore Database
   * 
   * @returns admin.firestore.Firestore - Instância do Firestore
   * @throws Error se Firebase não foi inicializado
   */
  getDatabase(): admin.firestore.Firestore {
    if (!this.initialized || !this.db) {
      throw new Error('Firebase não foi inicializado corretamente');
    }
    return this.db;
  }

  /**
   * Verifica se o Firebase foi inicializado com sucesso
   * 
   * @returns boolean - true se inicializado, false caso contrário
   */
  isInitialized(): boolean {
    return this.initialized && this.db !== null;
  }

  /**
   * Retorna informações de status da conexão
   * 
   * @returns object - Status da conexão Firebase
   */
  getStatus(): { initialized: boolean; projectId: string | undefined } {
    return {
      initialized: this.initialized,
      projectId: process.env.FIREBASE_PROJECT_ID
    };
  }
}

// Exporta instância singleton
export const firestoreConfig = new FirestoreConfig();