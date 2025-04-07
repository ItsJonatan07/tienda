import { PrismaClient } from '@prisma/client';

// Crea la instancia de Prisma Client
const prisma = new PrismaClient();

// Exporta la instancia para usarla en otros archivos
export default prisma;
