import { PrismaClient } from '@prisma/client';
try {
  const prisma = new PrismaClient();
  console.log("Success with no args");
} catch (e: any) {
  console.log("Failed with no args:", e.message);
}
try {
  const prisma = new PrismaClient({});
  console.log("Success with {}");
} catch (e: any) {
  console.log("Failed with {}:", e.message);
}
try {
  const prisma = new PrismaClient({ log: ['info'] });
  console.log("Success with non-empty");
} catch (e: any) {
  console.log("Failed with non-empty:", e.message);
}
