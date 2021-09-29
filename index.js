const Discord = require("discord.js"); //Tos > all !
const bot = new Discord.Client({disableMentions: 'everyone' }); //enlève !say @everyone / @here 
const config = require('./db/config.json') //token
const fs = require('fs'); //pas touche or gay !
const ms = require("ms");

bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
  if (err) console.log(err)
  let jsfile = files.filter(f => f.split('.').pop() === 'js') //pas touche or gay !
  if (jsfile.length <= 0) {
  }

  jsfile.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.config.name, props) 
  })
});

bot.on("ready", async () => {
    
    const channel = bot.channels.cache.get("892104932113657866") //Bot lancé !
   const embed1 = new Discord.MessageEmbed()
   .setDescription('**Je suis bien lancée !**')
   .setColor('ORANGE')
   channel.send(embed1)
   

  console.log( //Quand le bot est on !
    `${"-".repeat(40)}\n` +
    "|  Logs.  |\n" +
    `${"-".repeat(40)}\n` +
    "Bot Infos : \n" +
    `Nom du bot    : ${bot.user.tag}!\n` +
    `ID du bot     : ${bot.user.id}\n` +
    `Invitation : https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=2146958847 \n` +
    `${"-".repeat(40)}\n`
  );

  let statuses = [
    "HeriaServ / .gg/gSrKKUHSZR",//Statut du bot, EP 2 pour voir serveurs/membres
  ]

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {
      type: "PLAYING",
      //url: '.gg/gSrKKUHSZR' //abo ou t pas bo ! 🥰
    })
  }, 5000)
  
})

bot.on('message', async message => { //Quand on ping le bot + le prefix
  const prefix = "!";

  if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if (message.content === `<@!${bot.user.id}>`) {
      const ee = new Discord.MessageEmbed()
        .setTitle("On ma ping ?")
        .setColor("ORANGE")
        .setDescription("")
        .setTimestamp()
        .setFooter('')
      message.channel.send(ee)
    }

    if(!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commande = args.shift();

  const cmd = bot.commands.get(commande);
  const embederr = new Discord.MessageEmbed()
  .setDescription(`La commande : \`${commande}\` n'existe pas, \n pour voir la liste des commmandes faite : \`!help\`  ! `)
  .setColor("RED") //Commande qui existe pas !
  .setTimestamp()
  .setFooter('')
    if(!cmd) return message.channel.send(embederr)

    cmd.run(bot, message, args);
})


bot.on('guildCreate', async guild => {
  const channel = bot.channels.cache.get("ID") //Quand on add le bot
  let addembed = new Discord.MessageEmbed()
    .setTitle(`BOT vient d'être ajouté sur le serveur : ${guild.name}`)
    .setThumbnail(guild.iconURL())
    .addField(`👑 Propriétaire:`, `${guild.owner}`)
    .addField(`📇 Nom du serveur :`, `${guild.name}`)
    .addField(` Id du serveur:`, `${guild.id}`)
    .addField(` Nombre de membres:`, `${guild.memberCount}`)
    .setColor("11d646")
    .setTimestamp()
    .setFooter(`Merci grâce à toi nous sommes à ${bot.guilds.cache.size} serveurs`, bot.user.displayAvatarURL())
  channel.send(addembed);

})

bot.on('guildDelete', guild => {
  const channel = bot.channels.cache.get("ID") //Quand on kick le bot
  let removeembed = new Discord.MessageEmbed()
    .setTitle(`BOT vient d\'être retiré du serveur serveur ${guild.name}`)
    .setThumbnail(guild.iconURL())
    .addField(`👑 Propriétaire:`, `${guild.owner}`)
    .addField(`📇 Nom du serveur :`, `${guild.name}`)
    .addField(` Id du serveur:`, `${guild.id}`)
    .addField(` Nombre de membres:`, `${guild.memberCount}`)
    .setColor(`fc3d12`)
    .setFooter(`Désormais : ${bot.guilds.cache.size} serveurs`, bot.user.displayAvatarURL())
  channel.send(removeembed)

})

bot.on('guildCreate', async guild => {
  let embed = new Discord.MessageEmbed() // Dm le owner du serveur
    .setColor("RED")
    .setTitle("")
    .setDescription("")
    .setImage('')
    .setFooter('');
  guild.owner.send(embed);
});


bot.on('channelCreate', channel => {
  if (!channel.guild) return
  const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted') //On peut changé le name
  if (!muteRole) return
  channel.createOverwrite(muteRole, {
    SEND_MESSAGES: false,
    CONNECT: false,
    ADD_REACTIONS: false
  })
})

bot.on('guildCreate', async guild => {
  let embed = new Discord.MessageEmbed() // Dm le owner du serveur
    .setColor("RED")
    .setTitle("")
    .setDescription("")
    .setImage('')
    .setFooter('');
  guild.owner.send(embed);
})
  
bot.login(config.token) //Token du bot