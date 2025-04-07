import express from 'express';
import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../controllers/producto.controller.js';
import { autenticarToken } from '../middlewares/auth.middleware.js';
import { validarProducto } from '../validators/producto.validator.js'; // Importamos la validación
import { validarCampos } from '../middlewares/validarCampos.js'; // Importamos el middleware para manejar los errores de validación

const router = express.Router();

// Rutas para los productos
router.get('/', obtenerProductos); // Obtener todos los productos
router.get('/:id', obtenerProductoPorId); // Obtener producto por ID
router.post('/', autenticarToken, validarProducto, validarCampos, crearProducto); // Crear un producto (solo autenticados y validación de datos)
router.put('/:id', autenticarToken, validarProducto, validarCampos, actualizarProducto); // Actualizar un producto (solo autenticados y validación de datos)
router.delete('/:id', autenticarToken, eliminarProducto); // Eliminar un producto (solo autenticados)

export default router;
