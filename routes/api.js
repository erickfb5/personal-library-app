"use strict";

const expect = require("chai").expect;
const { deleteSingleBook } = require("../controllers");
const Book = require("../models/Book");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async (req, res) => {
      try {
        const books = await Book.aggregate([
          {
            $project: {
              _id: 1,
              title: 1,
              commentcount: { $size: "$comments" },
            },
          },
        ]);
        res.json(books);
      } catch (err) {
        res.status(500).send(err);
      }
    })
    .post(async (req, res) => {
      try {
        const { title } = req.body;
        if (!title) return res.send("missing required field title");

        const newBook = new Book({ title });
        const book = await newBook.save();
        res.json(book);
      } catch (err) {
        res.status(500).send("could not save");
      }
    })
    .delete(async (req, res) => {
      try {
        await Book.deleteMany({});
        res.send("complete delete successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

  app
    .route("/api/books/:id")
    .get(async (req, res) => {
      try {
        const bookid = req.params.id;
        const book = await Book.findById(bookid);
        if (!book) return res.send("no book exists");
        res.json(book);
      } catch (err) {
        res.status(500).send(err);
      }
    })
    .post(async (req, res) => {
      try {
        const bookid = req.params.id;
        const { comment } = req.body;
        if (!comment) return res.send("missing required field comment");
        const book = await Book.findOneAndUpdate(
          { _id: bookid },
          { $push: { comments: comment } },
          { new: true }
          );
          if (!book) return res.send("no book exists");
        res.json(book);
      } catch (err) {
        res.status(500).send(err);
      }
    })
    .delete(deleteSingleBook);
};
