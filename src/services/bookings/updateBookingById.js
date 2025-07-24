import prisma from "../../utils/prismaClient.js";

const updateBookingById = async (id, updatedBooking) => {
  const { userId, propertyId, ...rest } = updatedBooking;

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      ...rest,
      user: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
      property: propertyId
        ? {
            connect: { id: propertyId },
          }
        : undefined,
    },
  });

  return booking;
};

export default updateBookingById;
