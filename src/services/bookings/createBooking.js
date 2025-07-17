import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkInDate,
  checkOutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return booking;
};

export default createBooking;
