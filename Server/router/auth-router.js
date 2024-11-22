const express = require("express");
const authController = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validatior");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login);
router.route("/user").get(authMiddleware, authController.user);

module.exports = router;
