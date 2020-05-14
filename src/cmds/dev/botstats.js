const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (bot, message, args) => {
    try {
        const duration = moment.duration(bot.uptime).format(" D [дней], H [часа(ов)], m [минут], s [секунд]");
        const embed = new Discord.MessageEmbed()
            .setAuthor("Показатели бота")
            .setColor("#a7f442")
            .setThumbnail('https://discordemoji.com/assets/emoji/3619_discord_online.png')
            .setTimestamp()
            .addField("**⭕ | Использование памяти**", `**${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB**`, true)
            .addField("**🕑 | Uptime**", `**${duration}**`, true)
            .addField("**👥 | Пользователей**", `**${bot.users.cache.size}**`, true)
            .addField("**⚙ | Кол-во команд**", `**${bot.commands.size}**`, true)
            .addField("**💡 | Discord.js**", `**v${version}**`, true)
            .addField("** <:node:695714676151156827> | node.js**", `**${process.version}**`, true)
        message.channel.send(embed);
    } catch (err) {
        console.log(err);
    }
}
module.exports.help = {
    name: 'botstats',
    aliases: ['bs', 'статистика', 'ботстат'],
    description: 'Статистика бота',
    usages: { 'f.botstats': `Покажет статистику бота` },
    category: 'Разработка',
}