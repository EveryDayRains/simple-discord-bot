const Discord = require("discord.js");
const fs = require("fs");
const {admin} = config
module.exports.run = async (client, message, args) => {
    const text = args.join(' ');
        try {
            const json = JSON.parse(text);
            if ({}.hasOwnProperty.call(json, 'thumbnail')) {
                json.thumbnail = { url: json.thumbnail };
            }
            if ({}.hasOwnProperty.call(json, 'image')) {
                json.image = { url: json.image };
            }
            const plainText = json.plainText || '';
            delete json.plainText;
            const embed = new Discord.MessageEmbed(json);
            message.channel.send(plainText, embed);
        }
        catch (_) { }
      }
module.exports.help = {
    name: 'embed',
    description: 'Отправляет ембед в формате .json',
    aliases: ['em'],
    category: "Разработка",
    usages: {"f.embed код с эмбенд биледера" :"Выведет эмбенд"}
}; 
