const config = require("./Config.json");

let botToken;
if(config.useEnv == true){
    botToken = process.env.botToken;
}else{
    const Secrets = require("./Secrets.json");
    botToken = Secrets.botToken;
}


const eris = require("eris");
const fs = require("fs");
const ExtendedClient = require("./Structures/Client");

const bot = new ExtendedClient(botToken, {
    allowedMentions: {
        users: true,
        roles: false,
        everyone: false
    },
    defaultImageFormat: "png",
    defaultImageSize: 512,
    intents: [
        "guilds",
        "guildMembers",
        "guildMessages"
    ],
    getAllUsers: true,
    restMode: true,
    maxShards: "auto"
});

const init = async () => {
    const addOns = fs.readdirSync(__dirname + "/AddOns");
    for(const addOn of addOns) require(__dirname + "/AddOns/" + addOn)(eris);
    
    const Events = fs.readdirSync(__dirname + "/Events");
    for(const event of Events){
        const file = new (require(__dirname + "/Events/" + event))(bot);
        bot.on(event.slice(0, event.length - 3), (...args) => file.run(...args));
    }

    const Modules = fs.readdirSync(__dirname + "/Modules");
    for(const module of Modules){
        const config = require(__dirname + "/Modules/" + module + "/config.json");
        const Commands = fs.readdirSync(__dirname + "/Modules/" + module + "/Commands");
        for(const command of Commands){
            let file = new (require(__dirname + "/Modules/" + module + "/Commands/" + command))(bot);
            file.config = config;
            bot.commands.set(file.name, file);
            for(const alias of file.aliases){
                bot.aliases.set(alias, file);
            }
        }
    }

    bot.connect();
}

init();