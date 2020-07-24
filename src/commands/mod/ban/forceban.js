const { Embed, Command } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'forceban',
            description: '"Силой" забанить пользователя',
            usage: '<ID> [причина]'
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
        
        let guildMember = message.guild.members.get(member);
        if(guildMember) {
            if(utils.check(guildMember, 2) == true || utils.check(guildMember, 3) == true)
                return utils.error(message, 'USER_HAS_YOUR_TIER', { message: `Вы выбрали пользователя с правом **${utils.tiers[2]}**/**${utils.tiers[3]}**.` });

            if(guildMember.id == message.author.id)
                return utils.error(message, 'USER_HAS_YOUR_TIER', { message: `Вы указали себя.` });

            let reason = args.slice(1).join(' ');
            if(!reason)
                reason = 'Не указана';

            guildMember.send(`:warning: Вы были забенены на сервере **${message.guild.name}** модератором **${message.author.tag}** (ID: ${message.author.id}).\nПричина:\`\`\`${reason}\`\`\``)
                .then(() => {
                    guildMember.ban(`${message.author.tag} | ${reason}`);
                    let embed = new Embed()
                        .setColor('#00FF00')
                        .setDescription(`:white_check_mark: ${message.author} "силой" заблокировал ${guildMember} (ID: ${guildMember.user.id}) на сервере.`)
                        .addField('Причина', reason);

                    return message.channel.send(embed);
                }).catch(() => {
                    guildMember.ban(`${message.author.tag} | ${reason}`);
                    let embed = new Embed()
                        .setColor('#00FF00')
                        .setDescription(`:white_check_mark: ${message.author} "силой" заблокировал ${guildMember} (ID: ${guildMember.user.id}) на сервере.`)
                        .addField('Причина', `${reason}\n\n\`У пользователя закрыты личные сообщения.\``);

                    return message.channel.send(embed);
                });
        } else {
            let reason = args.slice(1).join(' ');
            if(!reason)
                reason = 'Не указана';

            message.guild.ban(member, `${message.author.tag} | ${reason}`);
            let embed = new Embed()
                .setColor('#00FF00')
                .setDescription(`:white_check_mark: ${message.author} "силой" заблокировал пользователя (ID: ${member}) на сервере.`)
                .addField('Причина', reason);

            return message.channel.send(embed);
        }
    }
};

module.exports = MyCommand;