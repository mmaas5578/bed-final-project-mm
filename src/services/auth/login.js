import jwt from "jsonwebtoken";
import prisma from "../../utils/prismaClient.js";

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  // Find user with matching username and password
  const user = await prisma.user.findFirst({
    where: { username, password },
  });

  if (!user) {
    return null;
  }

  // Create a token with the user ID
  const token = jwt.sign({ userId: user.id }, secretKey);

  return `Bearer ${token}`;
};

export default login;
