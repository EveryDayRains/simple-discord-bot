const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if(message.author.id !== config.admin) return message.channel.send(":x: Вы не имеете доступа к данной команде.");
    const toSay = args.join(" ");
    if(!toSay) return message.channel.send(":x: | Не указан текст для отправления.").then((m) => { message.delete(5000); m.delete(5000); });
    
    if(message.deletable) message.delete();
    return message.channel.send(toSay);
}

module.exports.help = {
    name: 'say',
    aliases: [`сказать`],
    description: 'Отправить сообщение в чат от имени бота',
    usages: { 'say <сообщение>': 'Отправит сообщение в канал от имени бота' },
    category: "Разработка"
};
