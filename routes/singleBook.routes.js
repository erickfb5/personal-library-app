"use strict";

const express = require("express");
const { getSingleBook, addNewComment, deleteSingleBook } = require("../controllers");
const router = express.Router();

router
  .route("/api/books/:id")
  .get(getSingleBook)
  .post(addNewComment)
  .delete(deleteSingleBook);

module.exports = router;