const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
 
    let replies = ["__**Tu as gagné**__", "__*Tu as perdu !*__ "];
    let question = args.slice(0).join(" ");
    let res = Math.floor(Math.random() * replies.length);
    
    message.reply(`${replies[res]}`)
};

module.exports.config = {
    name: 'pf'
};