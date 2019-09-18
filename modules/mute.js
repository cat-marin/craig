const config = require("../config.json");

module.exports = class mute {
    constructor(){
        this.name = 'mute',
        this.alias = ['m'],
        this.usage = `${config.prefix}mute`
    }

    async run(client, message, args) {
        let muteRole = message.guild.roles.get(config.muterole);
        let member = message.mentions.members.first();
        member.addRole(muteRole).catch(console.error);
        message.reply(`muted ${member}`);
    }
}
