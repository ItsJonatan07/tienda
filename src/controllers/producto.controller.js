import { PrismaClient } from '@prisma/client';
import redis from '../../config/redis.js';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Validación de creación de producto
export const validarProducto = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Obtener productos con paginación y ordenación
export const obtenerProductos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const orderBy = req.query.orderBy || 'precio';

  try {
    const productos = await prisma.producto.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [orderBy]: 'asc',
      },
    });

    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio,
        stock,
      },
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;

  try {
    const productoExistente = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!productoExistente) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const productoActualizado = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        descripcion,
        precio,
        stock,
      },
    });

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const productoExistente = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!productoExistente) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
