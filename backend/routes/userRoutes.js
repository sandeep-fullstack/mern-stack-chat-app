const express = require("express");
const {
  registerUser,
  authUser,
  getUserData,
  logoutUser
} = require("../controllers/userControllers");
const { protect,admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/getmyData").get(protect, getUserData);
router.route("/logoutUser").get(protect, logoutUser);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
