const { Embed, Command } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'kiss',
            description: 'Поцеловать пользователя',
            usage: '<@user/ID>'
        };
    }

    get customOptions() {
        return {
            tier: 1,
            category: 'reactions'
        };
    }

    async run(message, args) {
		let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
		if(!member)
			return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });
	
		let img = await utils.neko.sfw.kiss();
        let embed = new Embed()
        	.setColor('#7289DA')
            .setAuthor(`${message.author.username} поцеловал ${member.user.username}`, message.author.displayAvatarURL)
            .setImage(img.url);

        return message.channel.send(embed);
    }
};

module.exports = MyCommand;
