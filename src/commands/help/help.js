const { Embed, Command } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'help',
            description: 'Помощь по командам',
            usage: '[команда]'
        };
    }

    get customOptions() {
        return {
            tier: 1,
            category: 'other'
        };
    }

    async run(message, args) {
        if(!args.join(" ")) {
            let embed = new Embed()
                .setColor('#7289DA')
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(this.client.user.avatarURL({ dynamic: true }))
                .setTitle("Доступные команды");

            let commands = {
                moderation: '',
                economy: '',
                reactions: '',
                games: '',
                other: '',
                animals: '',
                settings: ''
            };

            this.client.commands.filter((command) => command.customOptions.category == "moderation").forEach((command) => commands.moderation += `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}\`  `);
            this.client.commands.filter((command) => command.customOptions.category == "economy").forEach((command) => commands.economy += `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}\` `);
            this.client.commands.filter((command) => command.customOptions.category == "reactions").forEach((command) => commands.reactions += `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}\` `);
            this.client.commands.filter((command) => command.customOptions.category == "games").forEach((command) => commands.games += `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}\` `);
            this.client.commands.filter((command) => command.customOptions.category == "other").forEach((command) => commands.other += `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}\` `);
            this.client.commands.filter((command) => command.customOptions.category == "animals").forEach((command) => commands.animals += `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}\` `);
            this.client.commands.filter((command) => command.customOptions.category == "settings").forEach((command) => commands.settings += `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}\` `);


            if(commands.moderation) embed.addField('Модерация', commands.moderation);
            if(commands.economy) embed.addField('Экономика', commands.economy);
            if(commands.reactions) embed.addField('Реакции', commands.reactions);
            if(commands.games) embed.addField('Игры', commands.games);
            if(commands.other) embed.addField('Прочее', commands.other);
            if(commands.animals) embed.addField('Животные', commands.animals)
            if(commands.settings) embed.addField('Настройки', commands.settings)

            embed.setDescription(`**Если вы нашли баг, обязательно сообщите разработчику \`${this.client.config.guild.get(message.guild.id).prefix+`bug`}\`** \n Для получения подробной информации напишите __\`${this.client.config.guild.get(message.guild.id).prefix + `help команнда`}\`__`)
            return message.channel.send(embed);
        } else {
            let command = this.client.commands.get(args.join(" "));
            if(!command)
                return utils.error(message, 'USER_HAS_YOUR_TIER', { message: 'Данной команды не существует.' });

            let categories = {
                moderation: 'Модерация',
                economy: 'Экономика',
                reactions: 'Реакции',
                games: 'Игры',
                animals: 'Животные'
            };

            let embed = new Embed()
                .setColor('#ca8080')
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setTitle(`Команда ${command.name}`)
                .setDescription(command.description || "Отсутствует")
                .addField(`Работает?`, (command.enabled) ? ":white_check_mark: Да" : ":x: Нет", true)
                .addField('Категория', categories[command.customOptions.category] || "Отсутствует", true)
                .addField('Использование', `\`${this.client.config.guild.get(message.guild.id).prefix}${command.name}${(command.usage == null ? '' : ` ${command.usage}`)}\``, true)
                .addField('Другие триггеры команды', `[\`${command.aliases.join("`, `") || '<отсутствуют>'}\`]`, true);

            return message.channel.send(embed);
        }
    }
};

module.exports = MyCommand;
