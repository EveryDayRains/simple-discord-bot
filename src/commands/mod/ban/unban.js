const { Embed, Command } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'unban',
            description: 'Разбанить пользователя',
            usage: '<ID>'
        };
    }

    get customOptions() {
        return {
            tier: 3,
            category: "moderation"
        };
    }

    async run(message, args) {
        if(utils.check(message.member, 3) == false)
            return utils.error(message, 'INVALID_USER_TIER', { tier: this.customOptions.tier });

        let member = args[0];
        if(!member)
            return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });
        
        message.guild.unban(member, `${message.author.tag}`).catch(() => {
            message.channel.send(`:x: Невозможно выполнить данное действие. Возможно у бота нет прав на выполнение таких действий.`);
        });
        
        let embed = new Embed()
            .setColor('#00FF00')
            .setDescription(`:white_check_mark: ${message.author} разбанил пользователя (ID: ${member}) на сервере.`);

        return message.channel.send(embed);
    }
};

module.exports = MyCommand;