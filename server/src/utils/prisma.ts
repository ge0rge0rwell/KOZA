import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Shared Prisma Client singleton.
 *
 * Prisma v7 removed `url = env(...)` from schema.prisma.
 * The `datasourceUrl` option here is the Prisma v7 way of supplying
 * the connection URL at runtime.
 */
const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
});

export default prisma;
