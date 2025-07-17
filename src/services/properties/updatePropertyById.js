import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatePropertyById = async (id, updatedData) => {
  const property = await prisma.property.update({
    where: { id },
    data: updatedData,
  });

  return property;
};

export default updatePropertyById;
