const Discord = require("discord.js");
const config = require("../config.json");

module.exports = class doas {
    constructor() {
        this.name = "doas",
        this.alias = ['doas'],
        this.usage = `${config.prefix}doas`
    }

    async run(bot, message, args) {
        function embedFunction() {
            let pUser = message.mentions.users.first() || message.guild.members.get(args[1]);
            let cUser = message.author;
            let logChannel = bot.channels.cache.get(config.logChannelID);
            let logEmbed = new Discord.MessageEmbed()
                .setDescription(action)
                .setColor("#D00B00")
                .addField(`${action}:`, `${pUser} with id ${pUser.id}`)
                .addField(`<@${cUser.tag}>`, `${reason}`)
                .addField("Time:", message.createdAt);
            logChannel.send(logEmbed);
        }

        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You can't do that.");
        if(message.member.permissions.has("MANAGE_MESSAGES") === true){
            var action = args[1];
            var reason = args.slice(3).join(' ');
            if(action === undefined) {
                message.channel.send("You must provide an argument.");
            }
            if(action === "mute") {
                let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                let muteRole = message.guild.roles.cache.get(config.muteRoleID);
                if(member === undefined) return message.channel.send("Who is being muted?");
                await(member.roles.add(muteRole).catch(console.error));
                message.channel.send(`Muted ${member}.`);
                embedFunction(action);

            }
            if(action === "unmute") {
                let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                let muteRole = message.guild.roles.cache.get(config.muteRoleID);
                if(member === undefined) return message.channel.send("Who is being muted?");
                await(member.roles.remove(muteRole).catch(console.error));
                message.channel.send(`Unmuted ${member}.`);
                embedFunction(action);
            }

            if(action === "ban") {
                let member = message.mentions.members.first() || message.guild.members.get(args[1]);
	            if(!member) return message.channel.send("Who is being banned?");
        	    if(!member.bannable) return message.channel.send("You cannot ban this user.");
                await message.guild.members.ban(member, reason);
                message.channel.send(`Banned ${member}.`);
                embedFunction(action);
            }

        }
    }
}
