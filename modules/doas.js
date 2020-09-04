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

                // We don't have to call addField() every time to add a field. We can just pass fields to the embed constructor using addFields()
                .addFields(
                    { name: `${action}:`, value: `${pUser} with id ${pUser.id}`},
                    { name: `<@${cUser.tag}>`, value: `${reason}`},
                    { name: "Time:", value: message.createdAt }
                )

            logChannel.send(logEmbed);
        }
        
        // We do not need: if(message.member.permissions.has("MANAGE_MESSAGES") === true)
        // since it either a falsy value or a true value

        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You can't do that.");
            var action = args[1];
            var reason = args.slice(3).join(' ');

            // Because of the switch case, these only need to be defined once. 
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            let muteRole = message.guild.roles.cache.get(config.muteRoleID);

            // Previously, we were using if statements to compare strings; this is a perfect use case for switch cases
            // Switch cases are generally faster than if...else if... else statements
            // https://www.oreilly.com/library/view/high-performance-javascript/9781449382308/ch04.html
            // Furthermore, they are generally just better practice and cleaner

            switch (action) { // Here we are "switching" a function. The function in this case is getting the value of action

                case 'mute': // Is it 'mute'?
                    if(member === undefined) return message.channel.send("Who is being muted?");
                    await(member.roles.add(muteRole).catch(console.error));
                    message.channel.send(`Muted ${member}.`);
                    embedFunction(action);
                    break;

                case 'unmute': // Is it 'unmute'?
                    if(member === undefined) return message.channel.send("Who is being unmuted?");
                    await(member.roles.remove(muteRole).catch(console.error));
                    message.channel.send(`Unmuted ${member}.`);
                    embedFunction(action);
                    break;

                case 'ban': // Is it 'ban'?
                    if(!member) return message.channel.send("Who is being banned?");
                    if(!member.bannable) return message.channel.send("You cannot ban this user.");
                    await message.guild.members.ban(member, reason);
                    message.channel.send(`Banned ${member}.`);
                    embedFunction(action);
                    break;
                
                case 'clear':
                    let clearNum;
                    if (isNaN(args[2]) || parseInt(args[2]) <= 0) return message.channel.send("That isn't a number.");
                    if (parseInt(args[2]) > 100) {
                        message.channel.send("Due to API limitations, you can only delete 100 messages at a time.");
                    } else {
                        clearNum = parseInt(args[2]);
                    }
                    message.channel.bulkDelete(clearNum, true);
                    break;

                default: // If there is no value to action, then return.
                    return
            }
        }
    }
