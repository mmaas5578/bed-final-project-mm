import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const prisma = new PrismaClient();

  // Find user with matching username and password
  const user = await prisma.user.findFirst({
    where: { username, password },
  });

  if (!user) {
    return null;
  }

  // Create a token with the user ID
  const token = jwt.sign({ userId: user.id }, secretKey);

  return token;
};

export default login;
