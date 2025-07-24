import prisma from "../../utils/prismaClient.js";

const deleteHostById = async (id) => {
  const host = await prisma.host.delete({
    where: { id },
  });

  return host;
};

export default deleteHostById;
