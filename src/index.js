const config = require("./Config.json");

let botToken,
dbConnect;
if(config.useEnv == true){
    botToken = process.env.botToken;
    dbConnect = process.env.dbConnect;
}else{
    const Secrets = require("./Secrets.json");
    botToken = Secrets.botToken;
    dbConnect = Secrets.dbConnect;
}


const eris = require("eris"),
fs = require("fs"),
ExtendedClient = require("./Structures/Client"),

bot = new ExtendedClient(botToken, {
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
}),

init = async () => {
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

    require("./Datebase/Init")({
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        useFindAndModify: false
    }, dbConnect);

    bot.connect();
}

init();