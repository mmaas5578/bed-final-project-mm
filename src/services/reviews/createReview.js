import prisma from "../../utils/prismaClient.js";

const createReview = async (userId, propertyId, rating, comment) => {
  const newReview = {
    userId,
    propertyId,
    rating,
    comment,
  };

  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;
