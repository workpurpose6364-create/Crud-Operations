const express = require("express");
const router = express.Router();


const {
  signup,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

module.exports = router;