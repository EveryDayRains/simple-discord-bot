const { Command,Embed } = require('discore.js');
class MyCommand extends Command {
    get options() {
    return {
        enabled: true,
        name: 'br',
        description: 'Поставить ставнку',
        usage: '<ставка>'
    };

}
  get customOptions() {
    return {
        tier: 1,
        category: 'economy'
    };
}
async run(message,args) {
    User.findOne({guildID: message.guild.id, userID: message.author.id},async(err,raw) => {
        let bal = raw.money
        let embed = new Embed()
        let rand = Math.floor(Math.random() * (100 - 0) + 0)
        function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
        };
        let rand2 = Math.floor(Math.random() * (100 - 10) + 10)
        rand2 + 13;
        if (rand2 > 100) rand2 = 100;
        let stavka = parseInt(args[0])
        if (!args[0] || !isNumeric(Math.floor(stavka)))         return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });
        if (bal <= Math.floor(stavka)) { embed.setDescription(`У вас не достаточно средств, у вас на балансе **${bal}**`); return message.channel.send(embed); }
        if (Math.floor(stavka) <= 10) { embed.setDescription("Минимальная ставка 10"); return message.channel.send(embed); }
        let check;
        if(rand2 < 60) {
            check = 0
            return Check2(check)
        }

        if(rand > rand2 || rand < rand2) {
            check = rand2
            return Check2(check)
        } else {
            rand2 = rand2 - 1
            check = rand2
            return Check2(check)
        }

        function Check2(res) {
            if(res === 0) {
                embed.setDescription("Вы проигали :( Попробуйте ещё раз позже");
               raw.money -= Math.floor(stavka)
               raw.save();
                embed.setColor(`#36393f`)
                return message.channel.send(embed);
            }
            if(res === 100) {
              raw.money += Math.floor(stavka * 10) - Math.floor(stavka)
              raw.save()
                embed.setColor('#10e250');
                embed.setDescription(`Вам выпало ${res} \n Вы выиграли ${Math.floor(stavka * 10)}`);
                return message.channel.send(embed);
            }
            if(res >= 90) {
                raw.money += Math.floor(stavka * 4) - Math.floor(stavka)
                raw.save()
                embed.setColor('#10e250');
                embed.setDescription(`Вам выпало ${res} \n Вы выиграли  ${Math.floor(stavka * 4)}`);
                return message.channel.send(embed);
            }
            if(res >= 60) {
                raw.money +=  Math.floor(stavka * 2) - Math.floor(stavka)
                raw.save()
                embed.setColor('#10e250');
                embed.setDescription(`Вам выпало ${res} \n Вы выиграли ${Math.floor(stavka * 2)}`);
                return message.channel.send(embed);
            }
        
        }

    })



}
disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`)
   }
}
module.exports = MyCommand;
