const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const userRouters = require("./routes/user-routes");
const settingRouters = require("./routes/settings-routes");
const HttpError = require("./models/http-error");

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/user", userRouters);
app.use("/api/settings", settingRouters);

app.use((req, res, next) => {
    const error = new HttpError("This page isn't working"); // handle url not valid
    next(error);
  });
  
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
  
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknow error occured" });
  });

  mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x6ooqfl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(5000); //process.env.PORT ||
  })
  .catch((err) => {
    console.log(err);
  });
