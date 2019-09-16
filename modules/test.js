var config = require('../config.json');
module.exports = class test {
  constructor(){
    this.name = 'test',
    this.alias = ['t'],
    this.usage = `${config.prefix}test`
  }

  async run(client, message, args) {
    await message.delete();
    message.reply(this.name + " works")
  }
}
