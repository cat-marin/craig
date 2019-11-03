const Discord = require("discord.js");
const config = require("../config.json");

module.exports = class clear {
  constructor() {
    (this.name = "clear"),
      (this.alias = ["clear"]),
      (this.usage = `${config.prefix}clear`);
  }

  run(bot, message, args) {
    const amount = args[1];
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("You can't do that.");
    if (message.member.hasPermission("MANAGE_MESSAGES") === true) {
      async function clear() {
        message.delete();
        const fetched = await message.channel.fetchMessages(amount);
        message.channel.bulkDelete(fetched);
      }
      clear();
      message.channel.send("cleared messages");
    }
  }
};
