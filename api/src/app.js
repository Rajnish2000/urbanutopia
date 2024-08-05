import express from "express";
import { createServer } from "http";
import ListingRouter from "./routes/listing/listing.routes.js";

const app = express();

const httpServer = createServer(app);

// body parser: to parse body data passes through request.
app.use(express.json());
app.use(express.urlencoded());

// setting path for static file:
app.use(express.static("public"));

// middleware test:
app.use((req, res, next) => {
  console.log("Hey! middleware tested.🤗");
  next();
});

// routes:
app.use("/api/v1/listing", ListingRouter);

export { httpServer };
