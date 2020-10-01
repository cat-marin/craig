const config = require("../config.json");
const roleFile = require("./comConfig/role.json");

module.exports = {
  run: async(client, message, args) => {
    const action = args[0];
    const roleName = args[1];
    const roleObject = message.guild.roles.cache.find(
      role => role.name === `${roleName}`
    );
    
    switch (action) {
      case 'add':
        if (!roleName) return message.channel.send("You must supply a role name.");
        
        var whitelist = Object.values(roleFile).slice(1)
        if (whitelist.includes(roleName) === undefined) return message.channel.send("Role not found")

        if (message.member.roles.cache.find(role => role.name === `${roleName}`)) {
          message.channel.send(`You are already in ${roleName}.`);
        } 
        else {
          message.member.roles.add(roleObject).catch(console.error);
          message.channel.send(`You were added to ${roleName}.`);
        }
        break;

      case 'remove':
        if (!roleName)
        return message.channel.send("You must supply a role name.");
        var whitelist = Object.values(roleFile).slice(1)
        if (whitelist.includes(roleName) === undefined) return message.channel.send("Role not found")
        message.member.roles.remove(roleObject).catch(console.error);
        message.channel.send(`You were removed from ${roleName}.`);
        break;

      case 'list':
        return message.channel.send(`${roleFile.list}`);

      default:
        return message.channel.send("You must supply an action (add/remove)");
    }
  },
  name: 'role', // Name of the command, the command handler uses this (required)

};
