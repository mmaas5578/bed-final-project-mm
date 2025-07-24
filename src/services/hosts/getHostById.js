import prisma from "../../utils/prismaClient.js";

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
      // password excluded
    },
  });

  return host;
};

export default getHostById;
