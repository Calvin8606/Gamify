// Constants
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/api/api");
const connectDB = require("./config/db");

const app = express();
const port = 4781;

// MIDDLEWARE
connectDB();
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    })
);
app.options("*", cors());

// ROUTES
app.use("/api", apiRouter);

// PORT CONNECTION
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
