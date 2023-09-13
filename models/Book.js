const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: { type: String, required: true },
  comments: {type: Array, default: []},
  commentcount: { type: Number, default: 0 }
});

const Book = model("Book", bookSchema);

module.exports = Book;