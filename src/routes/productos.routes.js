import express from 'express';
import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../controllers/producto.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.get('/', verificarToken, obtenerProductos);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;
