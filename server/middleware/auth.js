import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("[AUTH] Missing Authorization header");
    return res.status(401).json({ message: "Authorization header missing" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.error("[AUTH] Invalid Authorization format:", authHeader);
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize user ID (support id or _id from token)
    const userId = decoded._id || decoded.id;

    req.user = {
      ...decoded,
      id: userId,
      _id: userId,
    };

    console.log("[AUTH] User authenticated:", {
      id: req.user.id,
      role: req.user.role,
    });

    next();
  } catch (err) {
    console.error("[AUTH] Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
