// this package returns a function using which we can initiate a new express application object
const express = require("express");
const connect = require("./config/database");
const { PORT } = require("./config/serverConfig");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, async () => {
  // this callback will be executed everytime the server starts
  console.log(`Server started on port ${PORT}`);
  await connect();
  console.log(`mongo db connected`);
});