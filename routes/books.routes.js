"use strict";

const express = require("express");
const { getAllBooks, addNewBook, deleteAllBooks } = require("../controllers");
const router = express.Router();

router
  .route("/api/books")
  .get(getAllBooks)
  .post(addNewBook)
  .delete(deleteAllBooks);

module.exports = router;