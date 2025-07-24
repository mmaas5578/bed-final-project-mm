import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Allow all GET requests without a token
  if (req.method === "GET") {
    return next();
  }

  const authHeader = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  // Required: Authorization header needs to start with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }
  // Remove token from header
  const token = authHeader.slice(7).trim();

  if (!token) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
