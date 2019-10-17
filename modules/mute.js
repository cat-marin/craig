const config = require("../config.json");

module.exports = class mute {
    constructor(){
        this.name = 'mute',
        this.alias = ['m'],
        this.usage = `${config.prefix}mute`
    }

    async run(client, message, args) {
        let muteRole = message.guild.roles.get(config.muteRoleID);
        let member = message.mentions.members.first();
        if(message.member.roles.some(r=>[`${config.adminRoleName}`, `${config.modRoleName}`].includes(r.name)) ) {
            await(member.addRole(muteRole).catch(console.error));
            message.reply(`muted ${member}`);
        } else {
            message.channel.send("You can't do that");
        }
    }
}
