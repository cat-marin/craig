const config = require("../config.json");

module.exports = class role {
    constructor(){
        this.name = 'role',
        this.alias = ['r'],
        this.usage = `${config.prefix}role`
    }

    async run(client, message, args) {
        var roleFile = require('./comConfig/role.json');
        let action = args[1];
        let roleObject = args[2];
        let roleName = message.guild.roles.find(role => role.name === `${roleObject}`);
        if(action === undefined) return message.channel.send("You must supply an action (add/remove)");
//        if(roleObject === undefined) return message.channel.send("You must supply a role name.");
        
//        if(!roleFile[roleObject]) return message.channel.send("Role not found.");

        if(action === "add") {
	    if(roleObject === undefined) return message.channel.send("You must supply a role name.");
	    if(!roleFile[roleObject]) return message.channel.send("Role not found.");
            if(message.member.roles.find(role => role.name === `${roleObject}`)) {
                message.channel.send(`You are already in ${roleObject}.`);
            }else {
                message.member.addRole(roleName).catch(console.error);
                message.channel.send(`You were added to ${roleObject}.`);
            }
        }
        
        if(action === "remove") {
            message.member.removeRole(roleName).catch(console.error);
            message.channel.send(`You were removed from ${roleObject}.`);

        }
	
	if(action === "list") {
	    message.channel.send(`${roleFile.list}`);
	}
    }
}
