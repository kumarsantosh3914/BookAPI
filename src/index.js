// this package returns a function using which we can initiate a new express application object
const express = require("express");
const connect = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRoutes = require("./routes/index");
const logger = require("./config/logger");

// const { PORT } = require("./config/serverConfig");
const PORT = 4004;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.get("/home", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.listen(PORT, async () => {
  // this callback will be executed everytime the server starts
  console.log(`Server started on port ${PORT}`);
  await connect();
  console.log(`mongo db connected`);
});
