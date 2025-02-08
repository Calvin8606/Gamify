const mongoose = require("mongoose");

const MONGO_URI = ""; // Need environment variable for URI

let connection = null;

const connectDB = async () => {
    if (!connection) {
        connection = mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((conn) => {
                console.log("MongoDB Connected:", conn.connection.host);
                return conn;
            })
            .catch((err) => {
                console.error("MongoDB connection error:", err);
                process.exit(1);
            });
    }
    return connection;
};

module.exports = connectDB;
