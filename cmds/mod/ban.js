const Discord = module.require("discord.js");
const { logschannel } = config
module.exports.run = async (client, message, args) =>{
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Не найден пользователь, уточните.");
    let reason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Вы не имеете доступа к данной команде!");
    if(rUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Нельзя заблокировать данного пользователя!");

    //let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!reason) { reason = "Не указана" }

    let bembed = new Discord.RichEmbed()
        .setDescription('Бан')
        .setColor('#e22216')
        .addField("Модератор", message.author, true)
        .addField("Забанил", `${rUser}`,true)
        .addField("По причиние:", reason,true)
        .setFooter('Печалька(', message.author.avatarURL)
        .setThumbnail('https://discordemoji.com/assets/emoji/1651_BanOVE.gif');

    rUser.send(bembed);
    message.guild.member(rUser).ban(reason);
    await message.channel.send(bembed)
    await client.channels.get(logschannel).send(bembed)

}

module.exports.help = {
    name: 'ban',
    aliases: ['бан', 'темпбан', 'tempban', 'забанить', 'заблокировать'],
    description: 'Забанить участника сервера',
    category: 'Модерирование',
    usages: {'f.ban @user#0001': 'Забанить участника навсегда' }
}; 