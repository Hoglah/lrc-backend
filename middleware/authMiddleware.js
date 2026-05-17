// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "yourSecretKey";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.json({ success: false, message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Invalid token" });
  }
};
