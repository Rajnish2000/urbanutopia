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
});

export { listingSchemaValidator };
