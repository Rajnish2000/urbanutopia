import { Router } from "express";
import {
  listingAll,
  initListingDB,
  getByIdListing,
  editByIdListing,
  deleteByIdListing,
  createListing,
} from "../../controllers/listing/listing.controllers.js";

const router = Router();

console.log(router);

router.route("/all").get(listingAll);
router.route("/create").post(createListing);
router.route("/:id/view").get(getByIdListing);
// router.route("/?id=").get(getByIdListing);
router.route("/:id/edit").patch(editByIdListing);
router.route("/:id/delete").delete(deleteByIdListing);
router.route("/reset_db").get(initListingDB);

export default router;
