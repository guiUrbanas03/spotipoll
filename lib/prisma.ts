import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

if (!prisma) {
    throw new Error('Prisma client not defined.')
}

export default prisma;
