import {
  listingSchemaValidator,
  userSchemaValidator,
} from "../validators/schemaValidators.js";

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
  let validate_res = userSchemaValidator.validate(req.body);
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
