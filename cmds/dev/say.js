const {admin} = config
const Discord = module.require("discord.js");
module.exports.run = async (bot,message,args) => {
    if(message.author.id !== admin ) return message.channel.send("Вы не имеете доступа к данной команде!");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);

};
module.exports.help = {
    name: 'say',
    aliases: [`сказать`],
    description: 'Отправить сообщение в чат от имени бота',
    usages: { 'say сообщение': 'Отправит сообщение в канал от имени бота' },
    category: "Разработка"
}
