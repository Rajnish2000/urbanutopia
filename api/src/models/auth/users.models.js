import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: {
        _id: false,
        url: String,
        filename: String,
      },
      default: {
        url: "https://via.placeholder.com/250x250.png",
        filename: "myprofile",
      },
    },
    dob: {
      type: Date,
    },
    mobile_no: {
      type: String,
    },
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export { User };
