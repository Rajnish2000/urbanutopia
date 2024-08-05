import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: {
      url: String,
      filename: String,
    },
    default: { url: "https://via.placeholder.com/250x250.png", filename: "" },
  },
  price: {
    type: Number,
    default: 100,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export { Listing };
