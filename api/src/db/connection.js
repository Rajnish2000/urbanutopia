import mongoose from "mongoose";

let con_url = process.env.ATLAS_DB_URL;
// let db_name = process.env.DB_NAME;
const connectDB = async () => {
  try {
    let connectionInstance = await mongoose.connect(`${con_url}`);
    console.log(
      `🤞🤳🐱‍🏍 mongodb connected Successfully ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error(err);
  }
};

export { connectDB };
