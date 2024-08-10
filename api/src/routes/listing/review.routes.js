import { Router } from "express";
import {
  createReview,
  deleteReviewById,
  getallReviewOfListing,
  updateReviewById,
} from "../../controllers/listing/review.controllers.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.middleware.js";

const router = Router();

router.route("/create").post(isLoggedIn, createReview);
router.route("/all").get(getallReviewOfListing);
router.route("/:rid/update").patch(isLoggedIn, updateReviewById);
router.route("/:rid/delete").delete(isLoggedIn, deleteReviewById);

export default router;
