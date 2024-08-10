import Joi from "joi";

const listingSchemaValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  image: Joi.object({
    url: Joi.string(),
    filename: Joi.string(),
  }).allow("", null),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  geometry: Joi.object(),
});

const userSchemaValidator = Joi.object({
  name: Joi.string().default(null),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  dob: Joi.date().default(null),
  mobile_no: Joi.string().default(null),
  listings: Joi.array(),
});

export { listingSchemaValidator, userSchemaValidator };
