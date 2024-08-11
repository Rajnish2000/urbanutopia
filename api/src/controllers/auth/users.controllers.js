import { User } from "../../models/auth/users.models.js";
import { Review } from "../../models/listing/review.models.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import { asyncHandler } from "../../utilities/asyncHandler.js";
import { Listing } from "../../models/listing/listing.models.js";
// create User Api:
const createUser = asyncHandler(async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json(new ApiError(400, "Please send details.something went wrong."));
    }
    const password = req.body.password;
    const user = new User(req.body);
    // const result = await user.save();
    const result = await User.register(user, password);
    console.log(result);
    if (!result) {
      return res
        .status(400)
        .json(
          new ApiError(400, "user not created.something went wrong.", result)
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, "User Created Successfully.😍✔👻✔🤞"));
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(new ApiError(400, "User Creation Failed. try again.❌🤦‍♀️😣", err));
  }
});

// getUserById User Api:
const getUserById = asyncHandler(async (req, res) => {
  try {
    let uid = req.params.id;
    const result = await User.findById({ _id: uid });
    if (!result) {
      return res
        .status(400)
        .json(new ApiError(400, "user not Found.something went wrong.⭕❌😢"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "User data Fetched Successfully.😍✔👻✔🤞")
      );
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(new ApiError(400, "User Data Fetching Failed. try again.❌🤦‍♀️😣"));
  }
});

// updateUserById User Api:
const updateUserById = asyncHandler(async (req, res) => {
  try {
    let uid = req.params.id;
    if (req.user._id.valueOf() === uid) {
      if (!req.body) {
        return res
          .status(400)
          .json(
            new ApiError(400, "Please send data to update. Try again.❌😈🤦‍♂️")
          );
      }
      let result = await User.findByIdAndUpdate(uid, req.body);
      if (req.file) {
        console.log("req.file: ", req.file);
        result.image.url = req.file.path;
        result.image.filename = req.file.filename;
        result = await result.save();
      }
      if (!result) {
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              "user not Updated.something went wrong.try Again.🤦‍♂️😣👹"
            )
          );
      }
      return res
        .status(200)
        .json(
          new ApiResponse(200, result, "User Updated Successfully.😍✔👻✔🤞")
        );
    } else {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "You are not authorized to update this profile.😣",
            "Unauthorized Access Failed.😣❌😈"
          )
        );
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(new ApiError(500, "User Update Failed. try again.❌🤦‍♀️😣", err));
  }
});

// delete User Api:
const deleteUserById = asyncHandler(async (req, res) => {
  try {
    let uid = req.params.id;
    if (req.user._id.valueOf() === uid) {
      let reviews = await Review.find({ owner: req.user });
      reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
      req.user.listings.forEach(async (item) => {
        await item.reviews.forEach(async (review) => {
          await Review.findByIdAndDelete(review._id);
        });
        await Listing.findByIdAndDelete(item._id);
      });
      console.log(review);
      const result = await User.findByIdAndDelete(uid);
      if (!result) {
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              "user not deleted.something went wrong.try again.😈🤦‍♂️❌"
            )
          );
      }
      return res
        .status(200)
        .json(
          new ApiResponse(200, result, "User Deleted Successfully.😍✔👻✔🤞")
        );
    } else {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "You are not authorized to delete this Account.😣",
            "Unauthorized Access Failed.😣❌😈"
          )
        );
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(new ApiError(500, "User Deletion Failed. try again.❌🤦‍♀️😣"));
  }
});

const login = (req, res) => {
  const result = req.user;
  if (!result) {
    return res
      .status(400)
      .json(
        new ApiError(400, "User Credential Failed. Please login.�������‍��️")
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User login Successfully.😍✔👻✔🤞"));
};

const logout = (req, res) => {
  return req.logout((err) => {
    if (err) return next(err);
    else {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "User Logout Successfully.🤗😀✈"));
    }
  });
};

export {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  logout,
};
