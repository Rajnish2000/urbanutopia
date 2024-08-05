import mongoose from "mongoose";

const DB_NAME = "urbanUtopia_db";

const connectDB = async () => {
  try {
    let connectionInstance = await mongoose.connect(
      `mongodb://127.0.0.1:27017/${DB_NAME}`
    );
    console.log(
      `🤞🤳🐱‍🏍 mongodb connected Successfully ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error(err);
  }
};

export { connectDB };
