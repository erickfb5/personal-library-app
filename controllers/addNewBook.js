const Book = require("../models/Book.js");

const addNewBook = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.send("missing required field title");

    const newBook = new Book({ title });
    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error("🔴 Error adding new book 🔴 ⮕ ", err);
    res.status(500).json({ error: "An error occurred while adding new book." });
  }
};

module.exports = { addNewBook };
