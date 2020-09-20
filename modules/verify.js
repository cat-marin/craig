const config = require("../config.json");

module.exports = {
  run: async(client, message, args) => {
	try {			
		const roleName = message.guild.roles.cache.find(
			role => role.name === (`${config.verifiedID}`)
		);
		await message.member.roles.add(roleName).catch(console.error);
		await message.delete();
	}
	catch (error) {
		console.error(error)
	}
  },
  name: 'verify', // Name of the command, the command handler uses this (required)
  category: 'utilities', // The category, it must match the subdir (optional)
  argsReq: false, // Are arguments required? (optional)
  aliases: ['confirm'], // Aliases? (optional)
  description: "Verifies a user.", // Description for help command (optional)
  usage: "`verify`" // usage for help command (optional)
}