import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosts = async (filters = {}) => {
  return prisma.host.findMany({
    where: filters,
  });
};

export default getHosts;
