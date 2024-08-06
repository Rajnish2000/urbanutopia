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
      _id: false,
      url: String,
      filename: String,
      listImg: [],
      // set: (v) =>
      //   listImg.find(v) == -1 ? listImg.push(v) : (listImg = listImg),
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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Listing = mongoose.model("Listing", listingSchema);

export { Listing };
