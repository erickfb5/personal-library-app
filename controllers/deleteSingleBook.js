const Book = require("../models/Book.js");

const deleteSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) return res.send("no book exists");
    await Book.deleteOne({ _id: id });
    res.send("delete successful");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { deleteSingleBook };
