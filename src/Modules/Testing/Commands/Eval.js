const Base = require("../../../Structures/Command");

module.exports = class extends Base {
    constructor(bot){
        super(bot, {
            name: "eval",
            module: "Testing"
        })
    }


    async run(msg, args){
        
    }
}