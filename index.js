#!/usr/bin/env node
const Discord = require("discord.js");
const client = new Discord.Client();
var token = require("./token.json"); // token file, you need this to bring the bot online
var config = require("./config.json"); // config file, also necessary (should already be included)
var joinmessages = require("./joinmessages.json"); // join messages file, necessary for join messages to work
const { CommandHandler } = require("djs-commands");
client.commands = new Discord.Collection();
const prefix = config.prefix
const fs = require('fs')



client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}!`);
  console.log(
    `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`
  );
  client.user.setActivity(`${config.activity}`);
  console.log(`Set activity to "${config.activity}"`);
  console.log(client.commands)
});

// join message
client.on("guildMemberAdd", member => {
    var message = joinmessages.joinmessage[Math.floor(Math.random() * joinmessages.joinmessage.length)]
    var finalmessage = message.replace(/\$n/g, member.user.toString())
    finalmessage = finalmessage.replace(/\$p/g, member.displayName.toString())
    member.guild.channels.cache.get(config.joinChannelID).send(finalmessage)
    member.guild.channels.cache.get(config.joinChannelID).send(`Be sure to use <#624069649469800513> for support, and read the required reading to be verified.`)
});


const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    file_type = file.split(".").pop();
    file_name = file.split(/(\\|\/)/g).pop();
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } 
    else { 
      if (file_type == "js") results.push(file);
    }
  });
  return results;
}

const commandFiles = walk('./modules');

for (const file of commandFiles) {
  const command = require(`${file}`);
  client.commands.set(command.name, command);
}

client.categories = fs.readdirSync("./modules/");

// command handling start
client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  let args = message.content.slice(prefix.length).split(/ +/);
  let cmdName = args.shift();

  const command = client.commands.get(cmdName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.argsReq && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }
  try {
    command.run(client, message, args);
  } 
  catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});
// command handling end

client.on("error", console.error); // lol this is kind of necessary

client.login(`${token.token}`);
