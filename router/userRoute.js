const express = require ("express");
const { logout, loginUser, registerUser, forgotPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser } = require("../controllers/userController");
const { isAuthenticateUser, authorizedRoles } = require("../middleware/auth");
const router= express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticateUser ,getUserDetails);
router.route("/password/update").put(isAuthenticateUser ,updatePassword);
router.route("/me/update").put(isAuthenticateUser ,updateProfile);
router.route("/admin/users").put(isAuthenticateUser ,authorizedRoles("admin"),getAllUser);
router.route("/admin/users?:id").put(isAuthenticateUser ,authorizedRoles("admin"),getSingleUser);
module.exports = router
