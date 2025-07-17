import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (filters = {}) => {
  return await prisma.property.findMany({
    where: filters,
  });
};

export default getProperties;
