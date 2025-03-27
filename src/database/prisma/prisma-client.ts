import { PrismaClient } from '@prisma/client';

// Prisma client instance to avoid multiple connections to the database
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Use the existing instance or create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Prevent multiple instances in development (due to hot reload)
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
