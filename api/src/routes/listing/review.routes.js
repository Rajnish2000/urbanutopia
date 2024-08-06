import { Router } from "express";
import {
  createReview,
  deleteReviewById,
  getallReviewOfListing,
  updateReviewById,
} from "../../controllers/listing/review.controllers";

const router = Router();

router.route("/create", createReview);
router.route("/all", getallReviewOfListing);
router.route("/:rid/update", updateReviewById);
router.route("/:rid/delete", deleteReviewById);

export default router;
