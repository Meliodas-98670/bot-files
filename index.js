const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready" , async () =>{
  console.log('I am ready!');
  bot.user.setActivity("Do !Help", {type: "Testing"})

  //bot.user.setGame("on Game!");

    bot.user.setStatus("Do Not Disturbe");

    //bot.userSetStatus("Do Not Disturbe");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

if(cmd === `${prefix}kick`){

  //!kick daeshan askin for it

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Coudn't find the user to kick!");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You need permissons kick members to execute this command");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked cause hes a moderator or has kick permissions please demote him to kick him!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  .setColor("#0040ff")
  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let kickchannel = message.guild.channels.find(`name`, "incidents");
  if(!kickchannel) return message.channel.send("Coudn't find the incidents channel.");

  message.guild.member(kUser).kick(kReason);
  kickchannel.send(kickEmbed);

  return;
}



if(cmd === `${prefix}ban`){

  //!ban daeshan askin for it

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Coudn't find the user to bick!");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissons ban members to execute this command");
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned cause hes a moderator or has ban permissions please demote him to kick him!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#0040ff")
  .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Ban", bReason);

  let banchannel = message.guild.channels.find(`name`, "incidents");
  if(!banchannel) return message.channel.send("Coudn't find the incidents channel.");

  message.guild.member(bUser).ban(bReason);
  banchannel.send(banEmbed);

  return;
}


 if(cmd === `${prefix}report`){

  //!report @ned this is the reason

let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!rUser) return message.channel.send("Please mention the user in order to report. ```!report @mention user```");
let reason = args.join(" ").slice(22);

let reportembed = new Discord.RichEmbed()
.setDescription("Reports")
.setColor("#002699")
.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
.addField("Reported By", `${message.author} with ID:${message.author.id}`)
.addField("Channel", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", reason);

let reportschannel = message.guild.channels.find(`name`, "reports");
if(!reportschannel) return message.channel.send("Coudn't find the reports channel.");


message.delete().catch(O_o=>{});
reportschannel.send(reportEmbed);

   return;
 }




if(cmd === `${prefix}serverinfo`){

 let sicon = message.guild.iconURL;
 let serverembed = new Discord.RichEmbed()
 .setDescription("Server Information")
 .setColor("#ffff4d")
 .setThumbnail(sicon)
 .addField("Server Name", message.guild.name)
 .addField("Created On", message.guild.createdAt)
 .addField("You Joined", message.member.joinedAt)
 .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverembed);
}



if(cmd === `${prefix}botinfo`){
let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setDescription("Bot Information")
.setColor("#00ffff")
.setThumbnail(bicon)
.addField("Bot Name", bot.user.username)
.addField("Created On", bot.user.createdAt);

  return message.channel.send(botembed);
}

if(cmd === `${prefix}Help`){
let botembed = new Discord.RichEmbed()
.setTitle("these bot commands are used in a bot")
.setDescription(" Note:To use kick ban commands and specify the log you need to create a channel named incidents for logs")
.setColor("#00ffff")
.addField("Moderation Commands", ("=kick [mention user] reason, =ban [mention user] reason"))
.addField("Info Commands", ("serverinfo,botinfo"));

return message.channel.send(botembed);
}


});

bot.login(botconfig.token);
