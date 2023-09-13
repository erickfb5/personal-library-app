"use strict";

const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");
const runner = require("../tests/test-runner");

const testFilter = (tests, type, n) => {
  let out;
  switch (type) {
    case "unit":
      out = tests.filter((t) => t.context.match("Unit Tests"));
      break;
    case "functional":
      out = tests.filter((t) => t.context.match("Functional Tests") && !t.title.match("#example"));
      break;
    default:
      out = tests;
  }
  if (n !== undefined) return out[n] || out;
  return out;
};

router.get("/_api/server.js", (req, res, next) => {
  console.log("requested");
  fs.readFile(__dirname + "/server.js", (err, data) => {
    if (err) return next(err);
    res.send(data.toString());
  });
});

router.get("/_api/routes/api.js", (req, res, next) => {
  console.log("requested");
  fs.readFile(__dirname + "/routes/api.js", (err, data) => {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

router.get("/_api/get-tests",cors(),(req, res, next) => {
    console.log("requested");
    if (process.env.NODE_ENV === "test") return next();
    res.json({ status: "unavailable" });
  },
  (req, res, next) => {
    if (!runner.report) return next();
    res.json(testFilter(runner.report, req.query.type, req.query.n));
  },
  (req, res) => {
    runner.on("done", (report) =>
      process.nextTick(() => res.json(testFilter(runner.report, req.query.type, req.query.n)))
    );
  }
);

router.get("/_api/app-info", (req, res) => {
  let hs = Object.keys(res._headers).filter((h) => !h.match(/^access-control-\w+/));
  let hObj = {};
  hs.forEach((h) => hObj[h] = res._headers[h]);
  delete res._headers["strict-transport-security"];
  res.json({ headers: hObj });
});

module.exports = router;