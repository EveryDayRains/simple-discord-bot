const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args) => {
        try {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!member) message.reply('Вы не выбрали пользователя')
         const { body } = await superagent
            .get("https://nekos.life/api/v2/img/pat");
        const embed = new Discord.RichEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} ударил ${member.user.username}`)
            .setImage(body.url)
        message.channel.send(embed)
    } catch (err) {
        client.logsErr(err)
    }
};



module.exports.help = {
    name: 'pat',
    aliases: ['похвалить'],
    description: 'Похвалить пользователя',
    usages: { 'f.pat @упомнинание': 'Похвалить пользователя' },
    category: "Реакции"
}; 