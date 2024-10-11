const express = require("express");
const appController = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validatior");
const validate = require("../middlewares/validate-middleware");

const router = express.Router();

router.route("/").get(appController.home);
router.route("/register").post(validate(signupSchema), appController.register);
router.route("/login").post(appController.login);

module.exports = router;
