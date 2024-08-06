import mongoose, { Schema } from "mongoose";

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
    dob: {
      type: Date,
    },
    mobile_no: {
      type: String,
    },
    password: {
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

const User = mongoose.model("User", userSchema);

export { User };
