const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./config/db");
require("dotenv").config();
const app = express();
app.use(express.static("public"));

const productRoute = require("./Routes/productRoute");
const userRoute = require("./Routes/userRoute");
const cartRoute = require("./Routes/cartRoute");
const orderRoute=require("./Routes/orderRoute");

app.use(cors());
app.use(express.json());
app.use("/", productRoute);
app.use("/", userRoute);
app.use("/", cartRoute);
app.use("/", orderRoute);

connectDb();

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  try {
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
