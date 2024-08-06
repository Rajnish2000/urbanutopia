import User from "../../models/auth/users.models.js";
import { ApiError } from "../../utilities/ApiError.js";
import { ApiResponse } from "../../utilities/ApiResponse.js";
import { asyncHandler } from "../../utilities/asyncHandler.js";

// create User Api:
const createUser = asyncHandler(async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json(new ApiError(400, "Please send details.something went wrong."));
    }
    const user = new User(req.body);
    const result = await user.save();
    if (!result) {
      return res
        .status(400)
        .json(new ApiError(400, "user not created.something went wrong."));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, "User Created Successfully.😍✔👻✔🤞"));
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(new ApiError(400, "User Creation Failed. try again.❌🤦‍♀️😣"));
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
    if (!req.body) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Please send data to update. Try again.❌😈🤦‍♂️")
        );
    }
    const result = await User.findByIdAndUpdate(uid, req.body);
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
      .json(new ApiResponse(200, result, "User Updated Successfully.😍✔👻✔🤞"));
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
      .json(new ApiResponse(200, result, "User Deleted Successfully.😍✔👻✔🤞"));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(new ApiError(500, "User Deletion Failed. try again.❌🤦‍♀️😣"));
  }
});

export { createUser, getUserById, updateUserById, deleteUserById };
