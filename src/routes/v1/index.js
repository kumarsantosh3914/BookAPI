const express = require("express");

const {
  UserController,
  AuthorController,
  BookController,
} = require("../../controllers/index");
const {
  AuthMiddlewares,
  AuthorMiddlewares,
  BookMiddlewares,
} = require("../../middlewares/index");

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

router.post(
  "/authors",
  AuthorMiddlewares.validateCreateRequest,
  AuthorController.create
);

router.get("/authors", AuthorController.getAll);

router.post("/books", BookController.create);
router.get("/books", BookController.getAll);
router.get(
  "/books/:id",
  BookMiddlewares.validateGetRequest,
  BookController.get
);

router.patch(
  "/books/:id/rate/:rating",
  BookMiddlewares.validateUpdateUserRatingRequest,
  AuthMiddlewares.isAuthenticated,
  BookController.updateUserRating
);

module.exports = router;
