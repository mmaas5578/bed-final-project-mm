import prisma from "../../utils/prismaClient.js";

const getHosts = async (filters = {}) => {
  return prisma.host.findMany({
    where: filters,
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
};

export default getHosts;
