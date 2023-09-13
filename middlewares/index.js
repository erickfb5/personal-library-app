const { loggerMiddleware } = require("./logger");
const { notFoundMiddleware } = require("./notFound");

module.exports = { loggerMiddleware, notFoundMiddleware };