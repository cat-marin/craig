const Discord = require("discord.js");

module.exports = {
	run: async(bot, message, args) => {
		try {
			// send rich embed for roll result
			const resultFunction = (action, result) => {
				let cUser = message.author;
				let resultEmbed = new Discord.MessageEmbed()
					.setDescription(`${action} - ${cUser}`)
					.setColor("#D00B00")
					.addField("Result", result)
				message.channel.send(resultEmbed);
			}
			var action = args[0];
			switch (action) {
			case 'coin': // binary, heads or tails
				var rand = ['heads','tails'];
				let result = rand[Math.floor(Math.random()*rand.length)];
				resultFunction(action, result);
				break;
			}
		}
		catch (error) {
			await message.channel.send(error)
		}
	},
	name: 'roll',
}
