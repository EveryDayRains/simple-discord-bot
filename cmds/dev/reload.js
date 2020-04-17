const Discord = module.require("discord.js");
module.exports.run = async(bot, message, args) => {
       if(!['ID1', 'ID2 (не обязательно)'].includes(message.author.id)) return message.channel.send("Вы не имеете доступа к данной команде!");

    if(!args[0]) return message.channel.send('Выберите команду, которую хотите перезагрузить');

    let command = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${command}.js`)]
        bot.commands.delete(command)
        const pull = require(`./${command}.js`)
        bot.commands.set(command, pull)
    } catch(e) {
        return message.channel.send(`Сбой перезагрузки: \`${args[0].toLowerCase()}\``);
    }

    message.channel.send(`Успешно перезагружено: \`${args[0].toLowerCase()}\``);

    }
    module.exports.help = {
        name: "reload",
        aliases: [`перезагрузить`],
        description: 'Перезагрузить команду бота',
        usages: { 'reload (команда)': 'Перезагрузит команду бота' },
        category: "Разработка"
        }
