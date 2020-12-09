class Command {
    constructor(bot, cmd){
        this.bot = bot;

        this.name = cmd.name || "";
        this.aliases = cmd.aliases || [];
        this.module = cmd.module || "Other";
        this.description = cmd.description || "None";
        this.usage = cmd.usage || "None";

        this.bPerms = cmd.bPerms || [];
        this.mPerms = cmd.mPerms || [];

        this.cooldown = cmd.cooldown || 2000;

        this.extendedHelp = cmd.extendedHelp || { title: 'No extended help embed', color: this.bot.config.mainColor };
    }
}

module.exports = Command;