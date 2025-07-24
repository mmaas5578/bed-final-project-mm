import prisma from "../../utils/prismaClient.js";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const newHost = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  const host = await prisma.host.create({
    data: newHost,
  });

  return host;
};

export default createHost;
