const config = require("../config.json");

module.exports = class verify {
	constructor() {
		(this.name = "verify"),
			(this.alias = ["verify"]),
			(this.usage = `${config.prefix}verify`);
	}

	async run(client, message, args) {
		const roleName = message.guild.roles.cache.find(
			role => role.name === `${config.verifiedID}`
		);
		message.member.roles.add(roleName).catch(console.error);
		message.channel.send(`Verified.`);
	}
}
