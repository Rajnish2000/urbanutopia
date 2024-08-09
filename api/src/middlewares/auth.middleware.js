import passport from "passport";
import { ApiError } from "../utilities/ApiError.js";
const Auth = (req, res, next) => {
  try {
    console.log("user: ", req.user);
    if (req.isAuthenticated()) return next();
    else throw new Error("user is not logged In. Please Login For Access.🤦‍♂️✔");
  } catch (err) {
    console.log(err.message);
    res
      .status(401)
      .json(new ApiError(401, "User is Not Authenticated.❌🤦‍♀️😣", err.message));
  }
};

export { Auth };
