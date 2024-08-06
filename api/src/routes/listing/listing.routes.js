import { Router } from "express";
import {
  listingAll,
  initListingDB,
  getByIdListing,
  editByIdListing,
  deleteByIdListing,
  createListing,
} from "../../controllers/listing/listing.controllers.js";
import { validateListing } from "../../middlewares/validateListing.middlewares.js";
import reviewRouter from "../../routes/listing/review.routes.js";
const router = Router();

console.log(router);

router.route("/all").get(listingAll);
router.route("/create").post(validateListing, createListing);
router.route("/:id/view").get(getByIdListing);
// router.route("/?id=").get(getByIdListing);
router.route("/:id/edit").patch(validateListing, editByIdListing);
router.route("/:id/delete").delete(deleteByIdListing);
router.route("/reset_db").get(initListingDB);
// router.route('/review').
router.use("/:id/review", reviewRouter);

export default router;
