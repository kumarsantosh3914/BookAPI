const express = require("express");

const { UserController } = require("../../controllers/index");
const { AuthMiddlewares } = require("../../middlewares/index");

const router = express.Router();

router.post(
  "/signup",
  AuthMiddlewares.validateSignupRequest,
  UserController.signup
);

// router.post("/signup", UserController.signup);

router.get("/home", (req, res) => {
  return res.status(200).json({ message: "ok" });
});

router.post(
  "/signin",
  AuthMiddlewares.validateSigninRequest,
  UserController.signin
);

// router.get('/home',)

module.exports = router;
