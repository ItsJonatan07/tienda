import express from 'express';
import { obtenerEstadisticas } from '../controllers/admin.controller.js';
import { verificarAdmin } from '../middlewares/auth.js'; 

const router = express.Router();

router.get('/dashboard', verificarAdmin, obtenerEstadisticas);

export default router;
