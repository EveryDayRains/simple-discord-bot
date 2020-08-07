const { Command,Embed } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'prefix',
            description: 'Смена префикса бота',
            usage: '<префикс>'
        };
    }
    get customOptions() {
        return {
            tier: 3,
            category: 'settings'
        };
    }
    run(message,args){
        if(utils.check(message.member, 3) == false)
        return utils.error(message, 'INVALID_USER_TIER', { tier: this.customOptions.tier });
        Guild.findOne({ guildID: message.guild.id }, async (err, res) => {
            let embed = new Embed()
            if(!args[0]){
                embed.setDescription(`Установка префикса \n для установки префикса введите ${this.client.config.guild.get(message.guild.id).prefix + 'prefix'} ваш_префикс`)
                .setColor(`#36393f`);
                message.channel.send(embed);
            }
            if(args[0].length > 3) return utils.error(message, 'USER_HAS_YOUR_TIER', { message: 'Вы указали больше 3 символа в префиксе! '});
            res.preifx = args[0]
            res.save();
            message.channel.send(`☑️ | Префикс бота установлен на ${args[0]}`)
            message.react('☑️')
        });
    }
    disabledRun(message, args) {
        message.reply(`:x: | Команда отключена разработчиком`)
    }
}
module.exports = MyCommand;