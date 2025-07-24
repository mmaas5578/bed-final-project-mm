import prisma from "../../utils/prismaClient.js";

const updatePropertyById = async (id, updatedData) => {
  const property = await prisma.property.update({
    where: { id },
    data: updatedData,
  });

  return property;
};

export default updatePropertyById;
