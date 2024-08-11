import {
  listingSchemaValidator,
  userSchemaValidator,
  userUpdateSchemaValidator,
} from "../validators/schemaValidators.js";
import { ApiError } from "../utilities/ApiError.js";

const validateListing = (req, res, next) => {
  let validate_res = listingSchemaValidator.validate(req.body);
  console.log(validate_res);
  if (validate_res.error) {
    return res.send(
      new ApiError(
        400,
        validate_res.error.details[0].message ||
          "Data is not valid. please! send correct data.",
        validate_res.error
      )
    );
  } else next();
};

const validateUser = (req, res, next) => {
  console.log("request type : ", req.method);
  let validate_res = {};
  if (req.method === "POST") {
    validate_res = userSchemaValidator.validate(req.body);
  } else if (req.method === "PATCH") {
    validate_res = userUpdateSchemaValidator.validate(req.body);
  }
  console.log(validate_res);
  if (validate_res.error) {
    return res.send(
      new ApiError(
        400,
        validate_res.error.details[0].message ||
          "Data is not valid. please! send correct data.",
        validate_res.error
      )
    );
  } else next();
};

export { validateListing, validateUser };
