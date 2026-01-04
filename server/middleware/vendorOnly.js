export const vendorOnly = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "vendor") {
    return res.status(403).json({ message: "Vendor access only" });
  }
  next();
};
