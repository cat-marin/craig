const Discord = require("discord.js");
const config = require("../config.json");

module.exports = class doas {
    constructor() {
        this.name = "doas",
        this.alias = ['doas'],
        this.usage = `${config.prefix}doas`
    }

    async run(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that.");
        if(message.member.hasPermission("MANAGE_MESSAGES") === true){
            let action = args[1];
            if(action === undefined) {
                message.channel.send("You must provide an argument.");
            }
            if(action === "mute") {
                let member = message.mentions.members.first() || message.guild.members.get(args[1]);
                let muteRole = message.guild.roles.get(config.muteRoleID);
                if(member === undefined) return message.channel.send("Who is being muted?");
                await(member.addRole(muteRole).catch(console.error));
                message.channel.send(`Muted ${member}.`);
            }
            if(action === "unmute") {
                let member = message.mentions.members.first() || message.guild.members.get(args[1]);
                let muteRole = message.guild.roles.get(config.muteRoleID);
                if(member === undefined) return message.channel.send("Who is being muted?");
                await(member.removeRole(muteRole).catch(console.error));
                message.channel.send(`Unmuted ${member}.`);
            }

            if(action === "ban") {
                let member = message.mentions.members.first() || message.guild.members.get(args[1]);
		if(!member) return message.channel.send("Who is being banned?");
		if(!member.bannable) return message.channel.send("You cannot ban this user.");
                await message.guild.ban(member);
                message.channel.send(`Banned ${member}.`);
            }

        }
    }
}
