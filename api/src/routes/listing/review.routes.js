import { Router } from "express";
import {
  createReview,
  deleteReviewById,
  getallReviewOfListing,
  updateReviewById,
} from "../../controllers/listing/review.controllers.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.middleware.js";

const router = Router();

router.route("/:id/create").post(isLoggedIn, createReview);
router.route("/:id/all").get(getallReviewOfListing);
router.route("/:id/:rid/update").patch(isLoggedIn, updateReviewById);
router.route("/:id/:rid/delete").delete(isLoggedIn, deleteReviewById);

export default router;
