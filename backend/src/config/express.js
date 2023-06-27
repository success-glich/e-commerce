const express = require("express");
const routes = require("../routes");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("../middlewares/error");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
