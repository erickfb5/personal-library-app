const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(`🔴 🔴 🔴 ⮕ `, err);
  }
};

module.exports = connectDB;