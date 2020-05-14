const Discord = require("discord.js");
const fs = require("fs");
const {admin} = config
module.exports.run = async (client, message, args) => {
    let Sender = message.author;
    const sayMessage = args.join(" ");
    if(!sayMessage) return message.channel.send("Укажите баг").then(msg => {msg.delete(5000)});

   let contact = new Discord.MessageEmbed()
   .setColor("#ff0f00")
   .setThumbnail(Sender.displayAvatarURL)
   .addField("Отправитель", Sender, true)
   .addField("ID отправителя: ", Sender.id, true)
   .addField("Баг: ", sayMessage)
   .setTimestamp()

   client.users.cache.get(admin).send(contact);

    let embed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle("Баг успешно отправлен!")
    .addField("Запрошено", Sender)
    .addField("Баг: ", sayMessage)
    .setFooter("Мы рассмотрим вашу проблему")

    message.channel.send(embed);
      }
module.exports.help = {
    name: 'bug',
    description: 'Отправляет репорт бага к разработчику',
    aliases: ['СПАСИ'],
    category: "Разработка",
    usages: {"f.bug ошибка": 'Отправит баг разработчику'},
}; 