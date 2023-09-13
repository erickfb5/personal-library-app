const Book = require("../models/Book.js");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const bookWithoutComments = books.map((book) => {
      const { comments, ...bookWithoutComment } = book.toObject();
      return bookWithoutComment;
    });

    return res.json(bookWithoutComments);
  } catch (err) {
    console.error("🔴 Error fetching books 🔴 ⮕ ", err);
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
};

module.exports = { getAllBooks };