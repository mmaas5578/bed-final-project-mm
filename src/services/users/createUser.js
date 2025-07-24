import prisma from "../../utils/prismaClient.js";

const createUser = async (
  username,
  name,
  password,
  email,
  phoneNumber,
  pictureUrl
) => {
  const newUser = {
    username,
    name,
    password,
    email,
    phoneNumber,
    pictureUrl,
  };

  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;
