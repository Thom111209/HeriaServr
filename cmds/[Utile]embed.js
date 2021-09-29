const { MessageEmbed } = require("discord.js")
const fs = require("fs");
module.exports.run = async (bot, message, args) => {

	if(!message.guild.member(message.author).hasPermission("SEND_MESSAGE")) return message.channel.send(`<a:Alerte2:754441317307777024> Vous n\'avez pas la permission __**\"GESTION DES MESSAGES\"**__, donc l\'action est imposible <a:Nop:836606008964415529> `)//check perm user
	if (!message.guild.member(bot.user).hasPermission("SEND_MESSAGE")) return message.channel.send("Je n'ai pas la __permission:__ __**\"GESTION DES MESSAGES\"**__, je ne peux donc envoyer l\'*embed* le salon ! <a:Victime:754441345623654514>") //check perm bot
	let str = args.join(" ");
	if(!str) return message.channel.send("Veuillez fournir du contenu.");
	message.delete();
	const embed = new MessageEmbed()
	.setDescription(str)
    .setColor('ORANGE')
    	 message.channel.send(embed)


};


module.exports.config = {
    name: "embed",

  };