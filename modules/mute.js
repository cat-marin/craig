const config = require("../config.json");

module.exports = class mute {
  constructor() {
    (this.name = "mute"),
      (this.alias = ["m"]),
      (this.usage = `${config.prefix}mute`);
  }

  async run(client, message, args) {
    const muteRole = message.guild.roles.get(config.muteRoleID);
    const member = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (
      message.member.roles.some(r =>
        [`${config.adminRoleName}`, `${config.modRoleName}`].includes(r.name)
      )
    ) {
      await member.addRole(muteRole).catch(console.error);
      message.reply(`muted ${member}`);
    } else {
      message.channel.send("You can't do that ");
    }
  }
};
