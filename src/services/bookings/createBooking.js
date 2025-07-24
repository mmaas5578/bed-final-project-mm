import prisma from "../../utils/prismaClient.js";

const createBooking = async (
  userId,
  propertyId,
  checkInDate,
  checkOutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
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
