import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (filters = {}) => {
  return prisma.user.findMany({
    where: filters,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      // password excluded
    },
  });
};

export default getUsers;
