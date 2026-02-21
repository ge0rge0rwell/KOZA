import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

try {
  const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL
  });
  console.log("Success with accelerateUrl:", !!prisma);
  
} catch (e: any) {
  console.log("Failed with accelerateUrl:", e.message);
}
