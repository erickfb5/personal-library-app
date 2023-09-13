"use strict";

const express = require("express");
const { getSingleBook, addNewComment } = require("../controllers");
const router = express.Router();

router.route("/api/books/:_id").get(getSingleBook).post(addNewComment);

module.exports = router;