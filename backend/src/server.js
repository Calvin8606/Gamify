// CONSTANTS
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = 4781;
connectDB();
app.use(bodyParser.json());
app.use(cors());

// PORT CONNECTION
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
