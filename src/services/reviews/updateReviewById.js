import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReviewById = async (id, updatedData) => {
  const review = await prisma.review.update({
    where: { id },
    data: updatedData,
  });

  return review;
};

export default updateReviewById;
