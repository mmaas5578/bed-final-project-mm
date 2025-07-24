import prisma from "../../utils/prismaClient.js";

const updateHostById = async (id, updatedData) => {
  const host = await prisma.host.update({
    where: { id },
    data: updatedData,
  });

  return host;
};

export default updateHostById;
