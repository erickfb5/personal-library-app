const Book = require("../models/Book.js");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.aggregate([
      { $project: { _id: 1, title: 1, commentcount: { $size: "$comments" } } },
    ]);
    res.json(books);
  } catch (err) {
    console.error("🔴 Error fetching all books 🔴 ⮕ ", err);
    res.status(500).json({ error: "An error occurred while fetching all books." });
  }
};

module.exports = { getAllBooks };