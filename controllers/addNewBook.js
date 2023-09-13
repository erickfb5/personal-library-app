const Book = require("../models/Book.js");

const addNewBook = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title.trim()) return res.json("missing required field title");

    const newBook = new Book({ title: title.trim() });
    await newBook.save();

    const bookObj = { _id: newBook._id, title: newBook.title };
    return res.json(bookObj);
  } catch (err) {
    console.error("🔴 Error adding new book 🔴 ⮕ ", err);
    res.status(500).json({ error: "An error occurred while adding a new book." });
  }
};

module.exports = { addNewBook };