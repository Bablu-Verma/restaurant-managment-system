import express from "express";
import color from "colors";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import connsectDB from "./cofig/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import storeRoute from "./routes/storeRoute.js";

const app = express();
dotenv.config();

// connect db
const DB_URL = process.env.DB_URL;
connsectDB(DB_URL);


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static('public'));

// routes
app.get("/", (req, resp) => {
  resp.send("restaurant managment system softwear is working 🙃");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/user/store", storeRoute);

// app listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app listen on ${process.env.APP_MODE}, port url ${port}`.bgCyan);
});
