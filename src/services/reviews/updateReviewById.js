import prisma from "../../utils/prismaClient.js";

const updateReviewById = async (id, updatedData) => {
  const review = await prisma.review.update({
    where: { id },
    data: updatedData,
  });

  return review;
};

export default updateReviewById;
