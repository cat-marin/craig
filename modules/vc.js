var config = require('../config.json');
const Discord = require('discord.js');
module.exports = class vc {
  constructor() {
    this.name = 'vc',
    this.alias = ['vc'],
    this.usage = `${config.prefix}vc`
  }

  async run(client, message, args) {
    let action = args[1];
    if(action === undefined) return message.channel.send("You must supply an action (join/leave)");
    if(action === "join") {
      let channel = message.member.voiceChannel;
        channel.join()
        .catch(console.error);
    }
    if(action === "leave") {
      let channel = message.member.voiceChannel;
        channel.leave();
    }
    if(action === "test") {
      let channel = message.member.voiceChannel;
      channel.join()
      .then(connection => {
        const dispatcher = connection.playFile('/home/cat/amb.mp3');
        dispatcher.on("end", end => {channel.leave()});
    });
  }
}
}
