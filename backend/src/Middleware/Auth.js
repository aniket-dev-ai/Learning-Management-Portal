import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied! No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Now correctly set userId for controllers
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token! 😵",
    });
  }
};
