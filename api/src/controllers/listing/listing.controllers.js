import { sampleListings } from "../../../../data.js";
import { Listing } from "../../models/listing/listing.models.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import { asyncHandler } from "../../utilities/asyncHandler.js";

// creating new Listing :
const createListing = asyncHandler(async (req, res) => {
  try {
    if (req.body) {
      const newListing = new Listing(req.body);
      const result = await newListing.save();
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            result,
            "Listing Item Created Successfully.😁😍👻"
          )
        );
    }
  } catch (err) {
    console.error(err.errors?.properties);
    return res.status(500).json({
      status: 500,
      message: err.message == "" ? "Internal Server Error😣" : err.message,
    });
  }
});

// getting all listing:
const listingAll = asyncHandler(async (req, res) => {
  try {
    // let { username } = req.cookies;
    // let username = req.signedCookies;
    // console.log("cookies : ", username);
    // console.log("session", req.session);
    const result = await Listing.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "Listing Item Fetched Successfully😀😀😂")
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          err.message == "" ? "Internal Server Error😣" : err.message,
          err
        )
      );
  }
});

// getting listing by id:
const getByIdListing = asyncHandler(async (req, res) => {
  try {
    console.log("req id : ", req.params.id);
    const result = await Listing.findOne({ _id: req.params.id });
    console.log(result);
    if (result == null) {
      throw new Error("Item Not Found Error.");
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            result,
            "Listing Item fetch By Id Successfully.😂🤣🧨"
          )
        );
    }
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          err.message == "" ? "Internal Server Error😣" : err.message,
          err
        )
      );
  }
});
// Editing listing by id:
const editByIdListing = asyncHandler(async (req, res) => {
  try {
    const result = await Listing.findByIdAndUpdate(req.params.id, req.body);
    if (result === null) {
      throw new Error("Listing Item update Failed!");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "Listing Item Updated Successfully.😂🤣🧨")
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          err.message == "" ? "Internal Server Error😣" : err.message,
          err
        )
      );
  }
});
// Deleting listing by id:
const deleteByIdListing = asyncHandler(async (req, res) => {
  try {
    const result = await Listing.findByIdAndDelete(req.params.id);
    if (result === null) {
      throw new Error("Listing Item Deletion Failed😢😢😈👹");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Listing Item Deleted Successfully."));
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          err.message == "" ? "Internal Server Error😣" : err.message,
          err
        )
      );
  }
});

const initListingDB = asyncHandler(async (req, res) => {
  await Listing.deleteMany({});
  await Listing.insertMany(sampleListings);
  return res.status(200).send("Listings initialized successfully");
});

export {
  listingAll,
  initListingDB,
  getByIdListing,
  editByIdListing,
  deleteByIdListing,
  createListing,
};
