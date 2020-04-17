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
    let member = message.mentions.users.first();
    let memberID = member.id;
    if(!member) return;
    let fort19 = config.infectionRoleID;
    if (message.guild.members.get(memberID).roles.has(fort19)) {
        let chance = Math.random() * 100;
        if (chance <= 5) {
              await(message.member.addRole(fort19).catch(console.error));
              message.channel.send(`This user is now infected!`);
        };
    }
}

async function giveInfectionFunction(message) {
    let member = message.author;
    let memberID = member.id;
    let pingee = message.mentions.users.first();
    let pingeeID = pingee.id;
    if(!pingee) return;
    let fort19 = config.infectionRoleID;
    if(message.member.roles.has(fort19)) {
        let chance = Math.random() * 100;
        if (chance <= 100) {
            await(message.guild.members.get(pingeeID).addRole(fort19).catch(console.error));
            message.channel.send(`You infected another user!`);
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
