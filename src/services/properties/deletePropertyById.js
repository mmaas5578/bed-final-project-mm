import prisma from "../../utils/prismaClient.js";

const deletePropertyById = async (id) => {
  const property = await prisma.property.delete({
    where: { id },
  });

  return property;
};

export default deletePropertyById;
