const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
     if(message.author.id !== config.admin) return message.channel.send(":x: Вы не имеете доступа к данной команде.");
     return message.deletable ? message.delete().then(_ => {
         const txt = args.join("");
         return txt ? message.channel.send(txt) : message.channel.send(":x: | Не указан текст для отправления.").then(m => { 
             m.delete(5000); 
         });
     }) : undefined;
}

module.exports.help = {
    name: 'say',
    aliases: [`сказать`],
    description: 'Отправить сообщение в чат от имени бота',
    usages: { 'say <сообщение>': 'Отправит сообщение в канал от имени бота' },
    category: "Разработка"
};
