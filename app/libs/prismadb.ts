import { PrismaClient } from '@prisma/client';

declare global {
  // Allows the global prisma instance to be recognized in TypeScript
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client;  // Store the Prisma client globally in development
}

export default client;  // Export the singleton Prisma client
