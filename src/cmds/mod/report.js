const {logschannel} = config

module.exports.run = async (bot, message, args) => {

    const embed = new Discord.MessageEmbed()
            .setTitle(`Репорт`)
            .setColor('#e22216')
    let rUser = message.guild.member(message.mentions.users.first());
    if (!rUser) rUser = reasonz[1];
    let reason = args.join(" ");
    if (!reason) { embed.setDescription(`${msgs[1]}`); return bot.send(embed); };
    let emb = new Discord.RichEmbed()
        .setDescription(`Репорт`)
        .setColor('#702db6')
        .addField("Автор", message.author)
        .addField("Нарушитель", rUser)
        .addField("Канал", message.channel)
        .addField("Причина", reason)
        .setTimestamp()
      await client.channels.cache.get(logschannel).send(emb)
        message.react("✅");
    };
    module.exports.help = {
        name: "report",
        aliases: ["rp", 'репорт', 'пожаловаться', 'ябида', 'шестерка', 'мразь'],
        description: 'Жалобы на участников',
        usages: { 'f.report': `Отправит репорт на участника к модераторам` },
        category: 'Модерирование'

    };
