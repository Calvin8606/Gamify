// CONSTANTS
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const apiRouter = require("./routes/api/api");

const app = express();
const port = 4781;

// MIDDLEWARE
connectDB();
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use("/api", apiRouter);

// PORT CONNECTION
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
