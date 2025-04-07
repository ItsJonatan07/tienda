import { body } from 'express-validator';

export const validarProducto = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria'),

  body('precio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

  body('stock')
    .isInt({ min: 0 }).withMessage('El stock no puede ser negativo'),

  body('imagen')
    .optional().isURL().withMessage('La imagen debe ser una URL válida'),
];
