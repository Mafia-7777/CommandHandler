const { Client } = require("eris");
const ExtendedMap = require("extendedmap");

class ExtendedClient extends Client {
    constructor(token, options){
        super(token, options);

        this.commands = new ExtendedMap();
        this.aliases = new ExtendedMap();

        this.config = require("../Config.json");
        this.secrets = require("../Secrets.json");

        this.db = {
            guilds: new (require("../Datebase/Manager"))(null, require("../Datebase/Schemas/Guild"))
        }
    };
};

module.exports = ExtendedClient;