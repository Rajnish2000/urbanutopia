import { httpServer } from "./app.js";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./db/connection.js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const startServer = async () => {
  await connectDB();
  httpServer.listen(process.env.PORT, () => {
    // console.log(process.env);
    console.info(
      `😂✔👌 click here to go to the Server : http://127.0.0.1:${process.env.PORT}`
    );
    console.log(
      `Swagger docs available at http://localhost:${process.env.PORT}/api-docs`
    );
  });
  console.log("🦾🚀🌌  Server is running on port: " + process.env.PORT);
};

await startServer();
