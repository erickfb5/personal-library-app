"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const { rootRoutes, booksRoutes, testingRoutes, singleBookRoutes } = require("./routes");
const { loggerMiddleware, notFoundMiddleware } = require("./middlewares/");
const { logEvents } = require("./utils/logEvents.js");
const runner = require("./tests/test-runner.js");

const connectDB = require("./config/dbConn");
connectDB();

process.env.NODE_ENV && console.log(`🟡 🟡 🟡 ⮕  NODE ENVIRONMENT: ${process.env.NODE_ENV}`);

const app = express();

app.use(loggerMiddleware);

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rootRoutes)
app.use(booksRoutes)
app.use(singleBookRoutes)
app.use(testingRoutes);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
  console.log("🟢 🟢 🟢 ⮕  Connected to MongoDB");

  const listener = app.listen(PORT, () => {
    console.log(
      `🟢 🟢 🟢 ⮕  Server running on port ${listener.address().port} 🏃`
    );
    if (process.env.NODE_ENV === "tests") {
      console.log("🟢 🟢 🟢 ⮕  Running Tests... 🧪");
      setTimeout(() => {
        try {
          runner.run();
        } catch (err) {
          console.log("🔴 🔴 🔴 ⮕  Tests are not valid:");
          console.error(err);
        }
      }, 3500);
    }
  });
});

mongoose.connection.on("error", (err) => logEvents(`${err}:\t${err.code}\t${err.codeName}`, "mongoErrLog.log"));

module.exports = app; 