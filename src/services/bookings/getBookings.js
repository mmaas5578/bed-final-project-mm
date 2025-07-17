import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (filters = {}) => {
  return prisma.booking.findMany({
    where: filters,
  });
};

export default getBookings;
