import { Router } from 'express';
import { getAllItems } from '../controllers/item/getAllItems';
import { getItemById } from '../controllers/item/getItemById';

const router = Router();

// GET /items - Lista todos os itens
router.get('/', getAllItems);

// GET /items/:id - Busca um item específico pelo ID
router.get('/:id', getItemById);

export default router;
