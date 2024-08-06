import Router from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../../controllers/auth/users.controllers";

const router = Router();

router.route("/create").post(createUser);
router.route("/:id").get(getUserById);
router.route("/:id/edit").patch(updateUserById);
router.route("/:id/delete").delete(deleteUserById);

export default router;
