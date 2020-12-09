const mongo = require("mongoose");
const config = require("../../Config.json");

module.exports = mongo.model("Guilds", new mongo.Schema({
    id: { type: String },
    config: {
        prefix: { type: String, default: config.prefix }
    }
}));