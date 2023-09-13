const Book = require("../models/Book.js");

const deleteAllBooks = async (req, res) => {
    try {
      await Book.deleteMany({});
      res.send("complete delete successful");
    } catch (err) {
        console.error("🔴 Error deleting all books 🔴 ⮕ ", err);
        res.status(500).json({ error: "An error occurred while deleting all books." });
    }
  }

module.exports = { deleteAllBooks };