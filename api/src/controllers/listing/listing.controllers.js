import sampleListings from "../../../../data.js";
import { Listing } from "../../models/listing/listing.models.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import { asyncHandler } from "../../utilities/asyncHandler.js";
import geocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
import { Review } from "../../models/listing/review.models.js";

const geocodingClient = geocoding({ accessToken: process.env.MAP_TOKEN });

// creating new Listing :
const createListing = asyncHandler(async (req, res) => {
  try {
    let geoResponse = await geocodingClient
      .forwardGeocode({
        query: req.body.location,
        limit: 2,
      })
      .send();
    // console.log("geoResponse : ", geoResponse.body.features[0].geometry);
    if (req.body) {
      let newListing = new Listing(req.body);
      if (req.file) {
        console.log(req.file);
        newListing.image.filename = req.file.filename;
        newListing.image.url = req.file.path;
      }
      newListing.geometry = geoResponse.body.features[0].geometry;
      newListing.owner = req.user._id;
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
    let listing = await Listing.findById(req.params.id);
    if (listing.owner._id.valueOf() === req.user._id.valueOf()) {
      let geoResponse = await geocodingClient
        .forwardGeocode({
          query: req.body.location,
          limit: 2,
        })
        .send();
      let result = await Listing.findByIdAndUpdate(req.params.id, req.body);
      if (req.file) {
        // console.log("req file: ", req.file);
        // console.log("result: ", result);
        result.image.url = req.file.path;
        result.image.filename = req.file.filename;
      }
      result.geometry = geoResponse.body.features[0].geometry;
      result = await result.save();
      if (result === null) {
        throw new Error("Listing Item update Failed!");
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            result,
            "Listing Item Updated Successfully.😂🤣🧨"
          )
        );
    } else {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "You are not authorized to update this listing.😣",
            "Unauthorized Access Failed.😣❌😈"
          )
        );
    }
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
    let listing = await Listing.findById(req.params.id);
    if (listing.owner._id.valueOf() === req.user._id.valueOf()) {
      listing.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
      const result = await Listing.findByIdAndDelete(req.params.id);
      if (result === null) {
        throw new Error("Listing Item Deletion Failed😢😢😈👹");
      }
      return res
        .status(200)
        .json(
          new ApiResponse(200, result, "Listing Item Deleted Successfully.")
        );
    }
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "You are not authorized to delete this listing.😣",
          "Unauthorized Access Failed.😣❌😈"
        )
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

const initListingDB = asyncHandler(async (req, res) => {
  try {
    await Listing.deleteMany({});
    let newSampleListing = [];
    await sampleListings.map(async (e) => {
      let geoResponse = await geocodingClient
        .forwardGeocode({
          query: e.location,
          limit: 2,
        })
        .send();
      e = {
        ...e,
        owner: req.user._id,
        geometry: {
          type: "Point",
          coordinates: geoResponse.body.features[0].geometry.coordinates,
        },
      };
      newSampleListing.push(e);
      return await e;
    });
    setTimeout(async () => {
      await Listing.insertMany(newSampleListing);
    }, 1500);
    return res.status(200).send("Listings initialized successfully");
  } catch (err) {
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

export {
  listingAll,
  initListingDB,
  getByIdListing,
  editByIdListing,
  deleteByIdListing,
  createListing,
};
