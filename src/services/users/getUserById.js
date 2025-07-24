import prisma from "../../utils/prismaClient.js";

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      // Don't return password
    },
  });

  return user;
};

export default getUserById;
