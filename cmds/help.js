const Discord = require("discord.js");

module.exports.run = async(bot,message,args) => {
  let inviteembed = new Discord.MessageEmbed()

        const embed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle('COMMANDE ')
        .setDescription('__**Le bot possède :**__\n\n `!say,`*message*\n`!embed`,*message* \n`!8ball`, *question, Réponse aléatoire*\n`!pf`, *Pile ou Face*\n`!members`*Membres dans le server*\n\n__**Le bot possède en admin :**__\n\n`!clear`,*nombre de message que tu veut supprimer*\n`!ban`,\n`!unban`,\n`!kick`,\n`!lock`,*fermer un salon*\n`!total-ban`,*combien de ban*\n`!mute`\n\n*compte tout les membres présent sûr le discord !*')
        .setTimestamp()
        .setFooter('By Romain_craft ', 'https://cdn.discordapp.com/attachments/891070523436593212/891664450971656252/858984836387307551.png')
        .setImage('https://cdn.discordapp.com/attachments/891070523436593212/891664450971656252/858984836387307551.png')
  message.channel.send(embed)  
  }


  module.exports.config = {
    name: 'help' 
    }
