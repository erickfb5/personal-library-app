const { addNewBook } = require("./addNewBook");
const { addNewComment } = require("./addNewComment");
const { deleteAllBooks } = require("./deleteAllBooks");
const { deleteSingleBook } = require("./deleteSingleBook");
const { getAllBooks } = require("./getAllBooks");
const { getSingleBook } = require("./getSingleBook");

module.exports = { addNewBook, addNewComment, deleteAllBooks, deleteSingleBook, getAllBooks, getSingleBook };