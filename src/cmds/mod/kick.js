const {logschannel} = config
module.exports.run = async (client, message, args) =>{
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Не найден пользователь, уточните.");
    let reason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Вы не имеете доступа к данной команде!");
    if(rUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Нельзя заблокировать данного пользователя!");

    //let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!reason) { reason = "Не указана" }

    let bembed = new Discord.RichEmbed()
        .setDescription('Кик')
        .setColor('#e22216')
        .addField("Модератор", message.author, true)
        .addField("Кикнул", `${rUser}`,true)
        .addField("По причиние:", reason)
        .setFooter('Печалька(', message.author.avatarURL)
       // .setThumbnail('https://discordemoji.com/assets/emoji/1651_BanOVE.gif');

    rUser.send(bembed);
    message.guild.member(rUser).kick(reason);
    await message.channel.cache.send(bembed)
    await client.channels.cache.get(logschannel).send(bembed)

}

module.exports.help = {
    name: 'kick',
    aliases: ['кик'],
    description: 'Кикнуть участника сервера',
    category: 'Модерирование',
    usages: {'f.кик @user#0001': 'Кикнуть участника' }
}; 