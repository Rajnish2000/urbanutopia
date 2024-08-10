import Router from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  login,
  updateUserById,
  logout,
} from "../../controllers/auth/users.controllers.js";
import { validateUser } from "../../middlewares/validate.middlewares.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.middleware.js";
import passport from "passport";
import { fileUpload } from "../../middlewares/multer.middlewares.js";

const router = Router();

router
  .route("/login")
  .post(passport.authenticate("local", { failureMessage: true }), login);
router.route("/logout").get(logout);
router.route("/create").post(validateUser, createUser);
router.route("/:id").get(getUserById);
router
  .route("/:id/edit")
  .patch(isLoggedIn, validateUser, fileUpload, updateUserById);
router.route("/:id/delete").delete(isLoggedIn, deleteUserById);
export default router;
