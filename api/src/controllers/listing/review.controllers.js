import { Listing } from "../../models/listing/listing.models.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import { Review } from "../../models/listing/review.models.js";
import { asyncHandler } from "../../utilities/asyncHandler.js";

// create review api:
const createReview = asyncHandler(async (req, res) => {
  try {
    let lisId = req.params;
    if (!lisId) {
      return res.status(400).json(new ApiError(400, "reviewId Not Found"));
    }
    let listing = await Listing.findOne({ _id: lisId.id });
    if (!req.body) {
      return res.status(400).json(new ApiError(400, "Data Not Found"));
    }
    const review = new Review(req.body);
    review.owner = req.user._id;
    listing.reviews.push(review);
    await listing.save();
    const result = await review.save();
    res
      .status(200)
      .json(new ApiResponse(200, result, "Review Created Successfully.😁😎👻"));
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", err.errors));
  }
});

// get all review of particular listing:
const getallReviewOfListing = asyncHandler(async (req, res) => {
  try {
    let lisId = req.params;
    const review = await Listing.findById(lisId.id).populate("reviews");
    console.log(review);
    res
      .status(200)
      .json(new ApiResponse(200, review, "Review Fetch Successfully.✔😂👻"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", err.errors));
  }
});

// update review api:
const updateReviewById = asyncHandler(async (req, res) => {
  try {
    const { id, rid } = req.params;
    let review = await Review.findById(rid);
    if (!review)
      return res
        .status(400)
        .json(new ApiError(400, "Data Not Found.👻👹🎈", "No Review Found.."));
    if (req.user._id.valueOf() === review.owner._id.valueOf()) {
      if (!req.body) {
        return res.status(400).json(new ApiError(400, "Data Not Found.👻👹🎈"));
      }
      let result = await Review.findByIdAndUpdate(rid, req.body);
      if (!result) {
        return res
          .status(404)
          .json(new ApiError(404, "Review Not Updated.�������"));
      }
      return res
        .status(201)
        .json(
          new ApiResponse(201, result, "Review Updated Successfully.😍✔👻")
        );
    } else {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "You are not authorized to update this review.😣",
            "Unauthorized Access Failed.😣❌😈"
          )
        );
    }
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Review Update Failed.", err));
  }
});

// delete review api:
const deleteReviewById = asyncHandler(async (req, res) => {
  try {
    const lisId = req.params.id;
    const rId = req.params.rid;
    let review = await Review.findById(rId);
    if (!review) {
      return res
        .status(400)
        .json(new ApiError(400, "Data Not Found.👻👹🎈", "No Review Found.."));
    }
    if (req.user._id.valueOf() === review.owner._id.valueOf()) {
      const lisResult = await Listing.findById(lisId);
      lisResult.reviews.splice(
        lisResult.reviews.findIndex((e) => e._id.valueOf() == rId),
        1
      );
      let result = await Review.findByIdAndDelete(rId);
      result = await lisResult.save();
      if (!result) {
        return res
          .status(400)
          .json(
            new ApiError(400, "Review Deletion Failed. Something went wrong.")
          );
      }
      return res
        .status(200)
        .json(
          new ApiResponse(200, result, "Review Deleted Successfully.👻👻😜")
        );
    }
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "You are not authorized to Delete this review.😣",
          "Unauthorized Access Failed.😣❌😈"
        )
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(new ApiError(500, "Review Deletion Failed.😣😣🤦‍♀️❌", err.message));
  }
});

export {
  createReview,
  updateReviewById,
  getallReviewOfListing,
  deleteReviewById,
};
