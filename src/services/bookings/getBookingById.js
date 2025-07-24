import prisma from "../../utils/prismaClient.js";

const getBookingById = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  return booking;
};

export default getBookingById;
