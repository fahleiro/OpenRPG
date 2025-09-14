import { Router } from 'express';
import { ItemController } from '../controllers/ItemController';

const router = Router();

// GET /items - Lista todos os itens
router.get('/', ItemController.getAllItems);

// GET /items/:id - Busca um item específico pelo ID
router.get('/:id', ItemController.getItemById);

export default router;
