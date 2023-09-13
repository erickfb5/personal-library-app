"use strict";

const express = require("express");
const { getAllBooks, addNewBook } = require("../controllers");
const router = express.Router();

router.route("/api/books").get(getAllBooks).post(addNewBook);

module.exports = router;