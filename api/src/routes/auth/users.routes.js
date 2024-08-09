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
import { Auth } from "../../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();

router
  .route("/login")
  .post(passport.authenticate("local", { failureMessage: true }), login);
router.route("/logout").get(logout);
router.route("/create").post(validateUser, createUser);
router.route("/:id").get(getUserById);
router.route("/:id/edit").patch(Auth, updateUserById);
router.route("/:id/delete").delete(Auth, deleteUserById);
export default router;
