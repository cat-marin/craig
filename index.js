const Discord = require('discord.js');
const client = new Discord.Client();
var token = require('./token.json'); //token file, you need this to bring the bot online

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}!`);
  console.log(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`);
});

client.on('error', console.error); //lol this is kind of necessary

client.login(`${token.token}`);
