const { Embed, Command } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'clean',
            aliases: ['clear', 'purge', 'prune','del','убитьчтобыслетелачленососальня','🤡'],
            description: 'Очистить чат',
            usage: '<кол-во сообщений> [@user/ID]'
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

        let amount = parseInt(args.shift());
        if(!amount)
            return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });
        
        if(amount > 1000)
            return utils.error(message, 'USER_HAS_YOUR_TIER', { message: 'Вы пытаетесь очистить более 100 сообщений.' });

        const userArg = args.shift();
        const user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(userArg));
        
        if(user && (utils.check(user, 2) == true || utils.check(user, 3) == true))
            return utils.error(message, 'USER_HAS_YOUR_TIER', { message: `Вы выбрали пользователя с правом **${utils.tiers[3]}**/**${utils.tiers[4]}**.` });

        if(user && user.id == message.author.id)
            return utils.error(message, 'USER_HAS_YOUR_TIER', { message: `Вы указали себя.` });

        let deleted = 0;
        while (deleted !== amount) {
            let messages = await message.channel.messages.fetch({ limit: 100 });
            if (user) messages = messages.filter(msg => msg.author.id === user.id);
            messages = messages
                .map(m => m.id)
                .filter(m => m !== message.id)
                .slice(0, amount - deleted);
            
            await message.channel.bulkDelete(messages);
            if (messages.length < 1) break;
            deleted += messages.length;
        }
        
        const displayText = utils.fridaySnippet(amount, 'сообщение', 'сообщения', 'сообщений');
        let embed = new Embed()
            .setColor('#00FF00')
            .setDescription(`:white_check_mark: ${message.author} очистил чат${user ? ` от сообщений пользователя ${user} (ID: ${user.user.id})` : ''}.`)
            .addField('Кол-во удалённых сообщений', `${amount} ${displayText}`);

        return message.channel.send(embed);
    }
};

module.exports = MyCommand;
