const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); //NOTE allows cors requests from any client, we can specify only one client by writing codepen.io or something different
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  ); //NOTE allows specific methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); //NOTE client should send request specifying Content-Type and Authorization
  next();
}); // NOTE REST API, needs to set headers

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

/* TODO need to simplify the code everywhere */
