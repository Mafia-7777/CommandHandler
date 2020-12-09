module.exports = class {
    constructor(bot){
        this.bot = bot;
    }

    async run(msg){

        if(!msg.channel.guild || msg.author.bot) return;

        const prefix = this.bot.config.prefix;


        if(!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

        let args = msg.content.split(/ +/)
        let cmd = await this.bot.commands.get(args[0].toLowerCase().slice(prefix.length)) || await this.bot.aliases.get(args[0].toLowerCase().slice(prefix.length));
        if(!cmd) return;

        if(cmd.module == "Testing" && msg.author.id != this.bot.config.owner) return;

        cmd.run(msg, args).catch(() => {})


    }
}