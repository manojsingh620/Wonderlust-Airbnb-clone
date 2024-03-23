const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser = require("../controllers/user.js");

router.route("/signup")
    .get(controllerUser.signupRender)
    .post(wrapAsync(controllerUser.signup));



router.route("/login")
    .get(controllerUser.loginRander)
    .post(saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), controllerUser.login);


router.get("/logout", controllerUser.logout);
module.exports = router;