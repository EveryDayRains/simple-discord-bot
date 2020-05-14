const Discord = require('discord.js');
const superagent = require('superagent');
module.exports.run = async (client, message, args) => {
        try {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!member) message.reply('Вы не выбрали пользователя')
         const { body } = await superagent
            .get("https://nekos.life/api/v2/img/poke");
        const embed = new Discord.MessageEmbeds()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} тыкает ${member.user.username}`)
            .setImage(body.url)
        message.channel.send(embed)
    } catch (err) {
        client.logsErr(err)
    }
};



module.exports.help = {
    name: 'poke',
    aliases: ['тык','тыкнуть'],
    description: 'Тыкать пользователя',
    usages: { 'f.poke @упомнинание': 'Похвалить пользователя' },
    category: "Реакции"
}; 