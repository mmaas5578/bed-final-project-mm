import { PrismaClient } from "@prisma/client";

const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.delete({
    where: { id },
  });

  return review;
};

export default deleteReviewById;
