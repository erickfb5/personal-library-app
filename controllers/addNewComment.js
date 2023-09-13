const Book = require("../models/Book.js");

const addNewComment = async (req, res) => {
  try {
    const { _id } = req.params;
    let { comment } = req.body;
    comment = comment.trim();

    if (!comment) return res.json("missing required field comment")

    const book = await Book.findById(_id);
    if (!book) return res.json("no book exists")

    book.comments.push(comment);
    book.commentcount = book.comments.length

    await book.save();

    return res.json(book);
   } catch (err) {
    console.error("🔴 Error fetching book 🔴 ⮕ ", err);
    res.status(500).json({ error: "An error occurred while fetching book." });
  }
};

module.exports = { addNewComment };