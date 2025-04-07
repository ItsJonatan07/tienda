import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/registro', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], registrarUsuario);

router.post('/login', loginUsuario);

export default router;
