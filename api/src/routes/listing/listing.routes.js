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
import { isLoggedIn } from "../../middlewares/isLoggedIn.middleware.js";
import { fileUpload } from "../../middlewares/multer.middlewares.js";

const router = Router();

console.log(router);
router.use("/review", reviewRouter);
router.route("/all").get(isLoggedIn, listingAll);
router
  .route("/create")
  .post(isLoggedIn, validateListing, fileUpload, createListing);
router.route("/:id/view").get(getByIdListing);
// router.route("/?id=").get(getByIdListing);
router
  .route("/:id/edit")
  .patch(isLoggedIn, validateListing, fileUpload, editByIdListing);
router.route("/:id/delete").delete(isLoggedIn, deleteByIdListing);
router.route("/reset_db").get(initListingDB);
// router.route('/review').

export default router;
