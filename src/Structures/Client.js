const { Client } = require("eris");
const ExtendedMap = require("extendedmap");

class ExtendedClient extends Client {
    constructor(token, options){
        super(token, options);

        this.commands = new ExtendedMap();
        this.aliases = new ExtendedMap();

        this.config = require("../Config.json");
    };
};

module.exports = ExtendedClient;