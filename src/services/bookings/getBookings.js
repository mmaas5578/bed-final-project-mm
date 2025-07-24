import prisma from "../../utils/prismaClient.js";

const getBookings = async (filters = {}) => {
  return prisma.booking.findMany({
    where: filters,
  });
};

export default getBookings;
