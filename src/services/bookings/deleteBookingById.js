import { PrismaClient } from "@prisma/client";

const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.delete({
    where: { id },
  });

  return booking;
};

export default deleteBookingById;
