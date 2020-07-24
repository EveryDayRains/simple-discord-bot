const { Embed, Command } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'cleanban',
            aliases: ['softban'],
            description: 'Забанить пользователя и очистить его сообщения',
            usage: '<@user/ID> [кол-во дней] [причина]'
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

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!member)
            return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });
        
        if(utils.check(member, 2) == true || utils.check(member, 3) == true)
            return utils.error(message, 'USER_HAS_YOUR_TIER', { message: `Вы выбрали пользователя с правом **${utils.tiers[2]}**/**${utils.tiers[3]}**.` });

        if(member.id == message.author.id)
            return utils.error(message, 'USER_HAS_YOUR_TIER', { message: `Вы указали себя.` });

        if(member.user.bot == true)
            return utils.error(message, 'USER_HAS_YOUR_TIER', { message: `Вы указали бота.` });

        let cleanDays = parseInt(args.slice(1).join(' '));
        if(!cleanDays)
            cleanDays = 1;

        let reason = args.slice(2).join(' ');
        if(!reason)
            reason = 'Не указана';

        member.send(`:warning: Вы были забенены на сервере **${message.guild.name}** модератором **${message.author.tag}** (ID: ${message.author.id}).\nПричина:\`\`\`${reason}\`\`\``)
            .then(() => {
                member.ban({
                    days: cleanDays,
                    reason: `${message.author.tag} | ${reason}`
                }).catch(() => {
                    message.channel.send(`:x: Невозможно выполнить данное действие. Возможно у бота нет прав на выполнение таких действий.`);
                });

                let embed = new Embed()
                    .setColor('#00FF00')
                    .setDescription(`:white_check_mark: ${message.author} заблокировал ${member} (ID: ${member.user.id}) на сервере.`)
                    .addField('Причина', reason)
                    .addField('Количество дней за которое удалены сообщения', `${cleanDays} ${utils.fridaySnippet(cleanDays, 'день', 'дня', 'дней')}`);

                return message.channel.send(embed);
            }).catch(() => {
                member.ban({
                    days: cleanDays,
                    reason: `${message.author.tag} | ${reason}`
                }).catch(() => {
                    message.channel.send(`:x: Невозможно выполнить данное действие. Возможно у бота нет прав на выполнение таких действий.`);
                });

                let embed = new Embed()
                    .setColor('#00FF00')
                    .setDescription(`:white_check_mark: ${message.author} заблокировал ${member} (ID: ${member.user.id}) на сервере.`)
                    .addField('Причина', `${reason}\n\n\`У пользователя закрыты личные сообщения.\``)
                    .addField('Количество дней за которое удалены сообщения', `${cleanDays} ${utils.fridaySnippet(cleanDays, 'день', 'дня', 'дней')}`);

                return message.channel.send(embed);
            });
    }
};

module.exports = MyCommand;