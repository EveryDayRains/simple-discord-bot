const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args) => {
        try {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!member) message.reply('Вы не выбрали пользователя')
         const { body } = await superagent
            .get("https://nekos.life/api/v2/img/smug");
        const embed = new Discord.RichEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} смущается`)
            .setImage(body.url)
        message.channel.send(embed)
    } catch (err) {
        client.logsErr(err)
    }
};



module.exports.help = {
    name: 'smug',
    aliases: ['смущатся'],
    description: 'Смущатся',
    usages: { 'f.smug': 'Смущатся' },
    category: "Реакции"
}; 