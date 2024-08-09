import { Router } from "express";
import {
  listingAll,
  initListingDB,
  getByIdListing,
  editByIdListing,
  deleteByIdListing,
  createListing,
} from "../../controllers/listing/listing.controllers.js";
import { validateListing } from "../../middlewares/validate.middlewares.js";
import reviewRouter from "../../routes/listing/review.routes.js";
import { Auth } from "../../middlewares/auth.middleware.js";
const router = Router();

console.log(router);

router.route("/all").get(Auth, listingAll);
router.route("/create").post(Auth, validateListing, createListing);
router.route("/:id/view").get(getByIdListing);
// router.route("/?id=").get(getByIdListing);
router.route("/:id/edit").patch(Auth, validateListing, editByIdListing);
router.route("/:id/delete").delete(Auth, deleteByIdListing);
router.route("/reset_db").get(initListingDB);
// router.route('/review').
router.use("/:id/review", reviewRouter);

export default router;
