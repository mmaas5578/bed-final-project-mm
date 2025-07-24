import prisma from "../../utils/prismaClient.js";

const deleteUserById = async (id) => {
  const user = await prisma.user.deleteMany({
    where: { id },
  });

  return user;
};

export default deleteUserById;
