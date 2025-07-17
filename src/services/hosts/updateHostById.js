import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateHostById = async (id, updatedData) => {
  const host = await prisma.host.update({
    where: { id },
    data: updatedData,
  });

  return host;
};

export default updateHostById;
