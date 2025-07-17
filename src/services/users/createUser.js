import { PrismaClient } from "@prisma/client";

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

  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;
