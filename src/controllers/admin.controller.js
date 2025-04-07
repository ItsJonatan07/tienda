import prisma from '../../config/prisma.js';


export const obtenerEstadisticas = async (req, res) => {
    try {
        const totalVentas = await prisma.pedido.aggregate({
            _sum: { total: true }
        });

        const totalPedidos = await prisma.pedido.count();

        const productosMasVendidos = await prisma.detallePedido.groupBy({
            by: ['productoId'],
            _sum: { cantidad: true },
            orderBy: { _sum: { cantidad: 'desc' } },
            take: 5,
        });

        const pedidosRecientes = await prisma.pedido.findMany({
            take: 5,
            orderBy: { creadoEn: 'desc' },
            include: { usuario: true }
        });

        res.json({
            totalVentas: totalVentas._sum.total || 0,
            totalPedidos,
            productosMasVendidos,
            pedidosRecientes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Cambiar para exportar por defecto
export default obtenerEstadisticas;