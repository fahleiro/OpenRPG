// @ts-ignore - Firebase Admin SDK types are included in the package
import admin from 'firebase-admin';
import { firestoreConfig } from '../../db/FirestoreConfig';

/**
 * Serviço para operações com Firebase Firestore relacionadas a contas
 * 
 * @description Gerencia operações CRUD para contas de usuário no Firestore,
 * utilizando a configuração centralizada do FirestoreConfig.
 */

class FirebaseService {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = firestoreConfig.getDatabase();
  }

  /**
   * Salva uma conta no Firestore
   * 
   * @param username - Nome de usuário
   * @param password - Senha hasheada
   * @returns Promise<string> - ID do documento criado
   */
  async saveAccount(username: string, password: string): Promise<string> {
    try {
      console.log('💾 [FIREBASE_SERVICE] Iniciando salvamento da conta');
      console.log('💾 [FIREBASE_SERVICE] Username:', username);
      console.log('💾 [FIREBASE_SERVICE] Password hash:', password.substring(0, 10) + '...');
      console.log('💾 [FIREBASE_SERVICE] Database instance:', this.db ? 'disponível' : 'indisponível');
      
      const accountData = {
        username,
        passwrod: password, // Mantendo o nome do campo conforme mostrado no Firebase
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      console.log('📝 [FIREBASE_SERVICE] Dados da conta preparados:', {
        username: accountData.username,
        passwrod: accountData.passwrod.substring(0, 10) + '...',
        createdAt: 'serverTimestamp',
        updatedAt: 'serverTimestamp'
      });

      const docRef = await this.db.collection('accounts').add(accountData);
      console.log(`✅ [FIREBASE_SERVICE] Conta salva no Firebase com ID: ${docRef.id}`);
      
      return docRef.id;
    } catch (error) {
      console.error('💥 [FIREBASE_SERVICE] ERRO ao salvar conta:', error);
      console.error('💥 [FIREBASE_SERVICE] Stack trace:', error instanceof Error ? error.stack : 'N/A');
      console.error('💥 [FIREBASE_SERVICE] Tipo do erro:', typeof error);
      throw new Error(`Falha ao salvar conta no Firebase: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Verifica se um username já existe no Firestore
   * 
   * @param username - Nome de usuário a verificar
   * @returns Promise<boolean> - true se existir, false caso contrário
   */
  async usernameExists(username: string): Promise<boolean> {
    try {
      console.log('🔍 [FIREBASE_SERVICE] Verificando username:', username);
      console.log('🔍 [FIREBASE_SERVICE] Database instance:', this.db ? 'disponível' : 'indisponível');
      
      const snapshot = await this.db
        .collection('accounts')
        .where('username', '==', username)
        .limit(1)
        .get();
      
      console.log('📊 [FIREBASE_SERVICE] Snapshot resultado:', {
        empty: snapshot.empty,
        size: snapshot.size,
        docs: snapshot.docs.length
      });
      
      const exists = !snapshot.empty;
      console.log('✅ [FIREBASE_SERVICE] Username existe:', exists);
      
      return exists;
    } catch (error) {
      console.error('💥 [FIREBASE_SERVICE] ERRO ao verificar username:', error);
      console.error('💥 [FIREBASE_SERVICE] Stack trace:', error instanceof Error ? error.stack : 'N/A');
      throw new Error(`Falha ao verificar username: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

}

export const firebaseService = new FirebaseService();
