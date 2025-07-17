import pkg from '@prisma/client';
import userData from "../src/data/users.json" with { type: "json" };
import hostData from "../src/data/hosts.json" with { type: "json" };
import propertyData from "../src/data/properties.json" with { type: "json" };
import bookingData from "../src/data/bookings.json" with { type: "json" };
import reviewData from "../src/data/reviews.json" with { type: "json" };

const { PrismaClient } = pkg;
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  const { bookings } = bookingData;
  const { reviews } = reviewData;

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  for (const booking of bookings) {
  await prisma.booking.upsert({
    where: { id: booking.id },
    update: {},
    create: {
      id: booking.id,
      checkInDate: new Date(booking.checkInDate),
      checkOutDate: new Date(booking.checkOutDate),
      numberOfGuests: booking.numberOfGuests,
      totalPrice: booking.totalPrice,
      bookingStatus: booking.bookingStatus,
      user: {
        connect: { id: booking.userId }
      },
      property: {
        connect: { id: booking.propertyId }
      }
    }
  });
}

for (const review of reviews) {
  await prisma.review.upsert({
    where: { id: review.id },
    update: {},
    create: {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      user: {
        connect: { id: review.userId }
      },
      property: {
        connect: { id: review.propertyId }
      }
    }
  });
}
}

main()
  .then(async () => {
    console.log("✅ Seeding complete.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  })