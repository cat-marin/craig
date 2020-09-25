const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {

    run: async(bot, message, args) => {
        try {
            // Cute arrow function
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
            const embedFunction = (action, names) => {
                let cUser = message.author;
                let logChannel = bot.channels.cache.get(config.logChannelID);
                let logEmbed = new Discord.MessageEmbed()
                    .setDescription(`**${names.join(', ')} was ${action} by ${cUser}**`)
                    .setColor("#D00B00")
                    .addField(`Reason`, reason)
                    .setTimestamp(message.createdAt)

                logChannel.send(logEmbed);
            }
            
            // We do not need if(message.member.permissions.has("MANAGE_MESSAGES") === true)
            // since it either a falsy value or a true value
            if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You can't do that.");
                var action = args[0];
                var reason = args.slice(2).join(' ').replace(/(<@!\d*>,\ *|<@!\d*>\ *)/gm, '')
            
                // Because of the switch case, these only need to be defined once. 
                let names = [];
                let member = message.mentions.members
                let muteRole = message.guild.roles.cache.get(config.muteRoleID);

                // Previously, we were using if statements to compare strings; this is a perfect use case for switch cases
                // Switch cases are generally faster than if...else if... else statements
                // https://www.oreilly.com/library/view/high-performance-javascript/9781449382308/ch04.html
                // Furthermore, they are generally just better practice and cleaner

                switch (action) { // Here we are "switching" a function. The function in this case is getting the value of action

                    case 'mute': // Is it 'mute'?
                        if(!member.first()) return message.channel.send("Who is being muted?");
                        member.forEach(x => x.roles.add(muteRole).catch(console.error).then(
                            names.push(`<@!${x.id}>`),
                        ));
                        console.log(member)
                        message.channel.send(`Muted ${names.join(', ')}.`)
                        embedFunction('muted', names); // We call the function the same way, except the 'action' parameter in the function gets set to the string
                        break;

                    case 'unmute': // Is it 'unmute'?
                        if(!member.first()) return message.channel.send("Who is being unmuted?");
                        member.forEach(x => x.roles.remove(muteRole).catch(console.error).then(
                            names.push(`<@!${x.id}>`),

                        ));
                        message.channel.send(`Unmuted ${names.join(', ')}.`);
                        embedFunction('unmuted', names);
                        break;

                    case 'ban': // Is it 'ban'?
                        if(!member.first()) return message.channel.send("Who is being banned?");
                        member.forEach(x => {
                            if (!x.bannable) return message.channel.send("You cannot ban this user.");
                        });                       
                         // You were not getting a GuildMember ouject and were passing a straight User object for one. Secondly, ban() takes an option Object like ({reason: reason:}
                        // You were passing a User object into the ban method, which won't work. Instead, we get the guildMember using guild.Member(member) and then use the ban() method with a reason
                        // in an options Object and it works!
                        member.forEach(x => x.ban({reason: reason}).catch(console.error).then(
                            names.push(`**${x.user.tag}**`),
                        ));
                        message.channel.send(`Banned ${names.join(', ')}.`);
                        embedFunction('banned', names);
                        break;
                    
                    case 'clear':
                        let clearNum;
                        if (isNaN(args[1]) || parseInt(args[2]) <= 0) return message.channel.send("That isn't a number.");
                        if (parseInt(args[1]) > 100) {
                            message.channel.send("Due to API limitations, you can only delete 100 messages at a time.");
                          
                        } else {
                            clearNum = parseInt(args[1]);
                        }
                        message.channel.bulkDelete(clearNum, true);
                        message.channel.send(`Deleted ${clearNum} messages.`);
                        break;

                    default: // If there is no value to action, then return.
                        return message.channel.send("Argument not found/recognized.");
                }
            }
            catch (error) {
                await message.channel.send(error)
            }

        },
        name: 'doas', // Name of the command, the command handler uses this (required)
      }
