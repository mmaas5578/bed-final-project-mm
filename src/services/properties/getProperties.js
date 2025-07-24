import prisma from "../../utils/prismaClient.js";

const getProperties = async (filters = {}) => {
  return await prisma.property.findMany({
    where: filters,
  });
};

export default getProperties;
