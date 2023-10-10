const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect("mongodb://localhost/bookApi");
};

module.exports = connect;
