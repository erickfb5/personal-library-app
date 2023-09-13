const Book = require("../models/Book.js");

const getSingleBook = async (req, res) => {
  try {
    const { _id } = req.params
    
    const book = await Book.findById(_id);
    if (!book) return res.json("no book exists")

    console.log("📗 book ⮕ ", book);
    return res.json(book);
  } catch (err) {
    console.error("🔴 Error fetching book 🔴 ⮕ ", err);
    res.status(500).json({ error: "An error occurred while fetching book." });
  }
};

module.exports = { getSingleBook };