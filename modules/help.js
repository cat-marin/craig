var config = require('../config.json');
module.exports = class help {
  constructor() {
    this.name = 'help',
    this.alias = ['h'],
    this.usage = `${config.prefix}help`
  }

  async run(client, message, args) {
    message.channel.send("right now there is no help menu, but there will be one that's easily modifiable in the future");
  }
}
