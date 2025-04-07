import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerPedidosPorUsuario = async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            where: { usuarioId: req.usuario.id },
            include: {
                detalles: {
                    include: {
                        producto: true // Evita múltiples consultas a la BD
                    }
                }
            },
            orderBy: { creadoEn: 'desc' },
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
