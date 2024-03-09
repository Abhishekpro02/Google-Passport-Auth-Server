// const isAuthenticated = async (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect(process.env.CLIENT_BASE_URL + "/login");
// };

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  next();
};
export default isAuthenticated;
