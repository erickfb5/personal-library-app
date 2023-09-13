"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const apiRoutes = require("./routes/api.js");
const { rootRoutes, booksRoutes, testingRoutes, singleBookRoutes } = require("./routes");
const { loggerMiddleware, notFoundMiddleware } = require("./middlewares/");
const { logEvents } = require("./utils/logEvents.js");
const runner = require("./tests/test-runner.js");


const connectDB = require("./config/dbConn");
connectDB();

console.log(`🟡 🟡 🟡 ⮕  NODE ENVIRONMENT: ${process.env.NODE_ENV}`);

const app = express();

app.use(loggerMiddleware);

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" })); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route("/").get((req, res) => res.sendFile(process.cwd() + "/views/index.html"));

apiRoutes(app)


app.use("/", rootRoutes)
// app.use(booksRoutes)
// app.use(singleBookRoutes)
app.use("/", testingRoutes);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
  console.log("🟢 🟢 🟢 ⮕  Connected to MongoDB");

  const listener = app.listen(PORT, () => {
    console.log(
      `🟢 🟢 🟢 ⮕  Server running on port ${listener.address().port} 🏃`
    );
    if (process.env.NODE_ENV === "test") {
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

mongoose.connection.on("error", (err) =>
  logEvents(`${err}:\t${err.code}\t${err.codeName}`, "mongoErrLog.log")
);

module.exports = app; //for testing
