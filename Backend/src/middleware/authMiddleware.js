export const authMiddleware = (req, res, next) => {
  console.log("Auth middleware hit");
  next();
};