import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// async function testConnection() {
//   try {
//     await prisma.$connect();
//     console.log("✅ Database connection successful");
//     await prisma.$disconnect();
//   } catch (error) {
//     console.error("❌ Database connection error:", error);
//   }
// }

export default prisma;
