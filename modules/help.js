const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const helpConf = require("./comConfig/help.json");

module.exports =  {
  run: async(client, message, args) => {
    try {
      const com = args[0];
      const notFound = new MessageEmbed()
        .setColor("#D00B00")
        .setTitle("Help")
        .addField("List", `${helpConf.list}`);
      const helpEmbed = new MessageEmbed()
        .setColor("#D00B00")
        .setTitle("Help")
        .addField(`${com}`, `${helpConf[com]}`);
      if (helpConf[com] === undefined) return message.channel.send(notFound);
      if (helpConf[com] != undefined) return message.channel.send(helpEmbed);
    }
    catch (error) {
      await message.channel.send(`\`${error}\``)
    }
},
name: 'help', // Name of command | this is used for issuing the command(required)
aliases: ['h'], // Put aliases here (optinal)
}
