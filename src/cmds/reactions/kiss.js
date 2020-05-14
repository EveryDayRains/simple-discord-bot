const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args) => {
        try {
            let member = message.guild.member(message.mentions.users.first());
            if(!member) message.reply('Вы не выбрали пользователя')
            const { body } = await superagent
                .get("https://nekos.life/api/v2/img/kiss");
            const embed = new Discord.MessageEmbed()
                .setColor("#FF30A2")
                .setTitle(`${message.author.username} поцеловал ${member.user.username}`)
                .setImage(body.url)
            message.channel.send(embed)
        } catch (err) {
            console.log(err.stack);
        }
    };
module.exports.help = {
    name: 'kiss',
    aliases: ['поцеловать'],
    description: 'Поцеловать пользователя',
    usages: { 'f.kiss @упомнинание': 'поцелуете пользователя' },
    category: "Реакции"
}; 