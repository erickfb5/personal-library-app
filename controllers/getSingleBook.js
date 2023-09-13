const Book = require("../models/Book.js");

const getSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.send("no book exists");
    res.json(book);
  } catch (err) {
    console.error(`🔴 Error fetching book 🆔 "${id}"🔴 ⮕ `, err);
    res.status(500).json({ error: `An error occurred while fetching book 🆔 "${id}".` });
  }
};

module.exports = { getSingleBook };