const express = require("express");
const routes = require("../routes");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("../middlewares/error");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
