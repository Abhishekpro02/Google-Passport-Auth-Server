import express from "express";
import passport from "passport";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_BASE_URL + "/login",
  }),
  function (req, res) {
    // res.status(200).json({
    //   success: true,
    //   message: "User has been successfully authenticated",
    //   user: req.user,
    // });
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

// router.get("/check", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send({ user: req.user });
//   } else {
//     res.send({ user: null });
//   }
// });
router.get("/check", isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out" });
  });
});

//get auth user profile
router.get("/profile", isAuthenticated, (req, res) => {
  res.status(200).json({
    user: req.user,
    success: true,
    message: "User profile",
  });
});

export default router;
