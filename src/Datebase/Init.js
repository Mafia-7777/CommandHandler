const mongo = require("mongoose");
module.exports = (options, connectURL) => {
    mongo.connect(connectURL, options);

    mongo.connection.once("connected", () => {
        console.log("Database connected!");
    })
}