const Book = require("../models/Book.js");

const addNewComment = async (req, res) => {
  const { id } = req.params;
  try {
    const { comment } = req.body;
    if (!comment) return res.send("missing required field comment");
    const book = await Book.findOneAndUpdate(
      { _id: id },
      { $push: { comments: comment } },
      { new: true }
      );
      if (!book) return res.send("no book exists");
    res.json(book);
   } catch (err) {
    console.error(`🔴 Error adding new comment to book 🆔 "${id}"  🔴 ⮕ `, d);
    res.status(500).json({ error: `An error occurred while adding new comment to book 🆔 "${id}".` });
  }
};

module.exports = { addNewComment };