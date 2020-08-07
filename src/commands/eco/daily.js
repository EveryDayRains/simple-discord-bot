const ms = require("parse-ms");
const { Command, Embed } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'daily',
            description: 'Получение ежедневной награды',
            usage: 'daily'
        };
    }

    get customOptions() {
        return {
            tier: 1,
            category: 'economy'
        };
    }
    run(message,args){
        let embed = new Embed()
        User.findOne({guildID: message.guild.id, userID: message.author.id},async (err,row) => {
        let levelu = row.level
        let randommoney = levelu * 10 + 25
        let time = row.cd
        let s = ms(((720 / 60) / 1000) - (Date.now() - time), { long: true });
        embed.setColor('#ee281f')
        embed.setDescription(`**${message.author.tag}** Вы уже забрали ежедневнию награду, приходите через **${s.hours} часа(ов) ${s.minutes} минут ${s.seconds} сек **`)
        if (time > Date.now()) return message.channel.send(embed)

        let add = Date.now() + ((720 * 60) * 1000);
        let mh;
        let cd;

        if (720 > 60) { mh = ' hours'; cd = (720 / 60) } else { mh = ' minutes'; cd = 720 };

        row.money += randommoney
        row.cd = add
        row.save();
        embed.setDescription(`Вы получили ${randommoney}! Приходите снова через 12 часов`)
        embed.setColor("#36393f")
        message.channel.send(embed)
        })
    }
    disabledRun(message, args) {
        message.reply(`:x: | Команда отключена разработчиком`)
    }
}
module.exports = MyCommand;
