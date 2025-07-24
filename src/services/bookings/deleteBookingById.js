import prisma from "../../utils/prismaClient.js";

const deleteBookingById = async (id) => {
  const booking = await prisma.booking.delete({
    where: { id },
  });

  return booking;
};

export default deleteBookingById;
