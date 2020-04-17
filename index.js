#!/usr/bin/env node
const Discord = require("discord.js");
const client = new Discord.Client();
var token = require("./token.json"); // token file, you need this to bring the bot online
var config = require("./config.json"); // config file, also necessary (should already be included)
const { CommandHandler } = require("djs-commands");
const CH = new CommandHandler({
  folder: __dirname + "/modules/",
  prefix: [`${config.prefix}`]
});

async function getInfectedFunction(message) {
    if (message.channel.type === "dm") return;
    if (message.author.type === "bot") return;
    let author = message.author.id;
    let member = message.mentions.users.first();
    if(!member) return;
    let fort19 = config.infectionRoleID;
    if (message.guild.members.get(author).roles.has(fort19)) return;
    if (message.guild.members.get(member.id).roles.has(fort19)) {
        let chance = Math.random() * 100;
        if (chance <= 10) {
              await(message.member.addRole(fort19));
              message.channel.send(`<@${message.author.id}> infected someone!`);
        };
    }
}

async function giveInfectionFunction(message) {
    if (message.channel.type === "dm") return;
    if (message.author.type === "bot") return;

    let pingee = message.mentions.users.first();
    if(!pingee) return;
    let fort19 = config.infectionRoleID;
    if(message.guild.members.get(pingee.id).roles.has(fort19)) return;
    if(message.member.roles.has(fort19)) {
        let chance = Math.random() * 100;
        if (chance <= 15) {
            await(message.guild.members.get(pingee.id).addRole(fort19));
            message.channel.send(`<@${message.author.id}> infected someone!`);
        };
    }
}

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}!`);
  console.log(
    `https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`
  );
  client.user.setActivity(`${config.activity}`);
  console.log(`Set activity to "${config.activity}"`);
});

// join message
client.on("guildMemberAdd", member => {
  member.guild.channels
    .get(config.joinChannelID)
    .send(`Everyone welcome <@${member.id}> to the server! Please read the rules and know that if you're here for support you'll need to use <#624069649469800513>`);
});

// command handling start
client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.author.type === "bot") return;
    giveInfectionFunction(message); 
    getInfectedFunction(message);
  const args = message.content.split(" ");
  const command = args[0];
  const cmd = CH.getCommand(command);
  if (!cmd) return;

  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.log(e);
  }
});
// command handling end

client.on("error", console.error); // lol this is kind of necessary

client.login(`${token.token}`);
