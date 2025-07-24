import prisma from "../../utils/prismaClient.js";

const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  return property;
};

export default getPropertyById;
