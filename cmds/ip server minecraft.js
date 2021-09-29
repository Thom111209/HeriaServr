const Discord = require('discord.js')

module.exports.run = async(bot,message,args) => {
    let inviteembed = new Discord.MessageEmbed()
  
          const embed = new Discord.MessageEmbed()
          .setColor('ORANGE')
          .setTitle('')
          .setDescription('*ip du server minecraft et **mc.heriaserv.fr***')
          .setTimestamp()
          .setFooter('By Romain_craft ', 'https://cdn.discordapp.com/attachments/891070523436593212/891664450971656252/858984836387307551.png')
          .setImage('')
    message.channel.send(embed)  
    }
module.exports.config = {
    name: "minecraft"
};
