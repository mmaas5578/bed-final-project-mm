import prisma from "../../utils/prismaClient.js";

const deleteReviewById = async (id) => {
  const review = await prisma.review.delete({
    where: { id },
  });

  return review;
};

export default deleteReviewById;
