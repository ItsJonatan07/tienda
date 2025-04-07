import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import productoRoutes from './routes/productos.routes.js';
import authRoutes from './routes/auth.routes.js';
import rateLimit from 'express-rate-limit';
import pagoRoutes from './routes/pago.routes.js';
import { webhookPago } from './controllers/pago.controller.js';
import adminRoutes from './controllers/admin.controller.js';




dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Configurar Express para confiar en el proxy
app.set('trust proxy', 1); 

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);

// Puerto y arranque seguro con conexión a DB
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por IP en 15 min
  message: "Demasiadas solicitudes, intenta más tarde"
});

app.use(limiter);
app.use('/api/pago', pagoRoutes);
app.use('/api/pago', webhookPago);
app.use('/api/admin', adminRoutes);

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado a la base de datos MySQL');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1);
  }
}

startServer();
