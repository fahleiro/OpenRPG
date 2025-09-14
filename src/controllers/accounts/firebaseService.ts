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
      const accountData = {
        username,
        passwrod: password, // Mantendo o nome do campo conforme mostrado no Firebase
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await this.db.collection('accounts').add(accountData);
      console.log(`✅ Conta salva no Firebase com ID: ${docRef.id}`);
      
      return docRef.id;
    } catch (error) {
      console.error('❌ Erro ao salvar conta no Firebase:', error);
      throw new Error('Falha ao salvar conta no Firebase');
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
      const snapshot = await this.db
        .collection('accounts')
        .where('username', '==', username)
        .limit(1)
        .get();
      
      return !snapshot.empty;
    } catch (error) {
      console.error('❌ Erro ao verificar username:', error);
      throw new Error('Falha ao verificar username');
    }
  }

}

export const firebaseService = new FirebaseService();
