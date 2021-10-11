const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const helpConf = require("./comConfig/help.json");

module.exports =  {
  run: async(client, message, args) => {
    try {	
	if (message.content === '!rb') {
		const authorMention = "<@" + message.author.id + ">";
		message.channel.send(`${authorMention} You will be pinged to bump again in 2 hours`)

        const timerEndEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle("REMINDER:")
            .addField('Message:','BUMP TIME!', true)
            .setTimestamp()

        setTimeout(function() {
            message.channel.send(`${authorMention} PING PONG!`,timerEndEmbed)
        }, 7200000)

	}
    }
    catch (error) {
      await message.channel.send(`\`${error}\``)
    }
},
name: 'rb', // Name of command | this is used for issuing the command(required)
aliases: [''], // Put aliases here (optinal)
}
