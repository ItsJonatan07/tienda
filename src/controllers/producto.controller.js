import { PrismaClient } from '@prisma/client';
import redis from '../../config/redis.js';


const prisma = new PrismaClient();

export const obtenerProductos = async (req, res) => {
    try {
        const cache = await redis.get("productos");
        if (cache) return res.json(JSON.parse(cache));

        const productos = await prisma.producto.findMany({ take: 50, orderBy: { creadoEn: 'desc' } });

        await redis.set("productos", JSON.stringify(productos), "EX", 60 * 5); // Cache por 5 minutos

        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await prisma.producto.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = await prisma.producto.create({
            data: req.body
        });
        res.json({ mensaje: "Producto creado", producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await prisma.producto.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.json({ mensaje: "Producto actualizado", producto: productoActualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        await prisma.producto.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
