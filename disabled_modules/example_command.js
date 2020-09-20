// import stuff here


module.exports = {
  // Run function that will be run when the command is issued
  // Always async
  run: async(client, message, args) => {
    // Try to run the command
    try {
      await message.channel.send(args.join(' '))
    }
    // catch any errors
    catch (error) {
      await message.channel.send(`\`${error}\``)
    }
  },
  name: 'say', // Name of command | this is used for issuing the command(required)
  category: 'utilities', // Category (optional)
  argsReq: true, // Are args required; boolean (optional)
  aliases: ['repeat'], // Put aliases here (optinal)
  description: 'Says what you want', // Description of command (optional)
  guildOnly: true, // Command only allowed in guild; boolean (optional)
  usage: '`say <sentence>`' // Command usage (optional)
}
