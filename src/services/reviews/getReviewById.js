import prisma from "../../utils/prismaClient.js";

const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  return review;
};

export default getReviewById;
