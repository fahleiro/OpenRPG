import { Router } from 'express';
import { createAccount } from '../controllers/accounts/createAccount';

/**
 * Rotas para gerenciamento de contas de usuário
 * 
 * @description Define as rotas relacionadas ao sistema de cadastro
 * de contas de usuário com integração Firebase.
 */

const router = Router();

// POST /accounts - Cria nova conta diretamente no Firestore
router.post('/', createAccount);

export default router;
