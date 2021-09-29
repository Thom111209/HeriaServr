const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('<a:Alerte1:754441316905123994>  Vous n\'avez pas la permission **BAN_MEMBERS** donc l\'action est imposible !') //check perm user
        if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('Je n\'ai pas la __permission:__ __**"ADMINISTRATEUR"**__, je ne peux donc pas faire le *ban perm !* ')//check perm bot

        const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])); //ban mentions/id
        
        if(!member) return message.channel.send("Veuillez mentionner un membre ou ID !"); //pas trouvé !

        if(!member) return message.channel.send('Impossible de trouver cet utilisateur ! <a:Alerte1:754441316905123994>');
        if(!member.bannable) return message.channel.send('Cet utilisateur ne peut pas être banni ! <a:Alerte1:754441316905123994>');

        if(member.id === message.author.id) return message.channel.send('Bruh, vous ne pouvez pas vous auto-ban !'); //auto ban 👀

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Non spécifié.';

        member.ban().then(member => {
          const banembed = new Discord.MessageEmbed()
          message.channel.send(banembed);
          message.channel.send(`**${member}** à été __**ban permanent**__ pour: __**${reason} !**__ `); //message dans le chat
      });
      message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])).send(`<:Elexyr22:754441336849170543> Vous êtes __**ban permanent**__ du serveur: __${message.guild.name}__, par **${message.author.username}**, Pour: __** ${reason} !**__ `).catch(console.error); //DM quand le mec est ban !

        
  }

module.exports.config = {
    name: "ban"
}