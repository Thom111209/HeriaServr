const Discord = require('discord.js');
const parseDuration = require('parse-duration')
const { MessageEmbed } = require("discord.js");
 
    module.exports.run = async(bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission **MANAGE_MESSAGES** donc l\'action est imposible ')
        if (!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la __permission:__ __**\"ADMINISTRATEUR\"**__, je ne peux donc pas faire le *mute perm!* ")
        
        const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        
        if (!member) return message.channel.send('__Veuillez mentionner le membre à mute.__')
        if(member.id == "264922677318385664") return message.channel.send("_Je ne peux pas **Mute** mon maître, désolé..._ ")
        if (member.id === message.guild.ownerID) return message.channel.send('***Vous ne pouvez mute le propriétaire du serveur.***')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('ous ne pouvez pas mute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre. ')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted By *HeriaServ Le Bot')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted By HeriaServ Le Bot',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }

        let Channel = message.guild.channels.cache.find(
            (ch) => ch.name === "logs"
          );
          if (!Channel)
            return message.channel.send(
              `__Il n'y a pas de canal dans cette guilde qui s'appelle__ \`logs\`\n**Merci d'en crée un !**`
            );
          let Embed = new MessageEmbed()
            .setTitle(`Nouveaux MUTE !`)
            .setDescription(
              `Le modérateur \`${message.author.tag}\` a mute  l'utilisateur \`${member}\`! `
            )
            .setColor(`ORANGE`)
            .addFields(
              { name: "ID du moderateur", value: `${message.author.id}`, inline: false },
              { name: "TAG du moderateur", value: `${message.author.tag}`, inline: false },
              { name: "ID de la personne Mute Temporairement", value: `${member.id}`, inline: false },
              { name: "TAG de la personne Mute Temporairement", value: `${member}`, inline: false },
              { name: "Raison du Mute", value: `\`${reason}\``, inline: false },
              {
                name: "Date (Y/M/D)",
                value: `${new Intl.DateTimeFormat("FR").format(Date.now())}`,
                inline: true,
              }
            );
          Channel.send(Embed);

        await member.roles.add(muteRole)
        message.channel.send(`**${member}** a été __mute perm__ pour: __**${reason} !**__ `)

        message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])).send(`Vous êtes __mute perm__  sur le serveur: **${message.guild.name}** par ** ${message.author.username}** Pour: __** ${reason} !**__`).catch(message.channel.send(""));
      }

      module.exports.config = {
        name: "mute"
      }

