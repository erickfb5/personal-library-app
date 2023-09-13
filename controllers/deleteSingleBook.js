const Book = require("../models/Book.js");

const deleteSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.send("no book exists");
    await Book.deleteOne({ _id: id });
    res.send("delete successful");
  } catch (err) {
    console.error(`🔴 Error deleting book 🆔 "${id}" 🔴 ⮕ `, err);
    res.status(500).json({ error: `An error occurred while deleting book 🆔 "${id}".` });
  }
};

module.exports = { deleteSingleBook };