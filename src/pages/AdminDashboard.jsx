import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('/api/admin/dashboard', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => res.json())
        .then(data => setStats(data));
    }, []);

    if (!stats) return <p>Cargando...</p>;

    return (
        <div>
            <h1>Dashboard de Ventas</h1>
            <p>Total Ventas: ${stats.totalVentas}</p>
            <p>Total Pedidos: {stats.totalPedidos}</p>

            <h2>Productos Más Vendidos</h2>
            <Pie data={{
                labels: stats.productosMasVendidos.map(p => `ID ${p.productoId}`),
                datasets: [{
                    data: stats.productosMasVendidos.map(p => p._sum.cantidad),
                    backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange']
                }]
            }} />

            <h2>Últimos Pedidos</h2>
            <ul>
                {stats.pedidosRecientes.map(p => (
                    <li key={p.id}>Pedido #{p.id} - {p.usuario.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
