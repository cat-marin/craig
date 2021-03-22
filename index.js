#!/usr/bin/env node
const Discord = require("discord.js");
const client = new Discord.Client();
var token = require("./token.json"); // token file, you need this to bring the bot online
var config = require("./config.json"); // config file, also necessary (should already be included)
var joinmessages = require("./joinmessages.json"); // join messages file, necessary for join messages to work
const { CommandHandler } = require("djs-commands");
// Needed to get commands
const fs = require('fs')


// Create a new collection to store commnads
client.commands = new Discord.Collection();

// declare prefix from config.json
const prefix = config.prefix



client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}!`);
  console.log(
    `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`
  );
  client.user.setActivity(`${config.activity}`);
  console.log(`Set activity to "${config.activity}"`);
  // during the editing of commands to accomidate the new handler, its useful that we can see the collection to make sure 
  // commands are being registered
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

// walk function; this recursively gets .js files and adds to an array
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

// call walk() and set the array to commandFiles
const commandFiles = walk('./modules');

// require commands as modules and set their names 
for (const file of commandFiles) {
  const command = require(`${file}`);
  client.commands.set(command.name, command);
}

// get categories if applicable 
client.categories = fs.readdirSync("./modules/");

// command handling start
client.on("message", message => {
  if (message.channel.type === "dm") return;
  // if user is bot, ignore
  if (message.author.bot) return
  // if a message does NOT start with prefix, ignore it 
  if (!message.content.startsWith(prefix)) return
  // args in an array ['command', '1', '2',...]
  let args = message.content.slice(prefix.length).split(/ +/);
  // remove the first element in args array ['command'] and make it the command name 
  let cmdName = args.shift();
  // first, see if the issued command is the actual name of the command, if not see if its an alias
  const command = client.commands.get(cmdName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

  // if neither conditions from above comment are meant, ignore it
  if (!command) return;

  // If DMs are disabled for a particular command, send something to the user
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }
  
  // Bump reminder
  if (message.content === '!d bump') {
		message.reply('If the bump was successful, please use `!rb` to set a reminder to bump again')
	}

	if (message.content === '!rb') {
		const authorMention = "<@" + message.author.id + ">";
		message.channel.send(`${authorMention} You will be pinged to bump again in 2 hours`)

        const timerEndEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle("REMINDER:")
            .addField('Message:','BUMP TIME!', true)
            .setTimestamp()
        
        setTimeout(function() {
            message.channel.send(`${authorMention} PING PONG!`,timerEndEmbed)
        }, 7200000)

	}

  // If args are required for a command and none are supplied, say something
  if (command.argsReq && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    // Also send the command usage if set
    if (command.usage) {
      reply += `\nThe proper usage would be: ${command.usage}`;
    }
    // send the reply
    return message.channel.send(reply);
  }
  try {
    // if *everything* checks out, run the "run" in the command file and pass the client, the message sent by the author
    // and the args array
    command.run(client, message, args);
  } 
  // if theres an error for some reason in the handler, console.error it and say something to the user
  catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});
// command handling end

client.on("error", console.error); // lol this is kind of necessary

client.login(`${token.token}`);
