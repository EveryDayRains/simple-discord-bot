const { Command } = require('discore.js');

class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'admin',
            description: 'А зочем тебе эта команда?',
            usage: '<toggle/load/reload/unload> <команда>'
        };
    }

    get customOptions() {
        return {
            tier: 4
        };
    }

    run(message, args) {
        if(utils.check(message.member, 4) !== true)
            return utils.error(message, 'INVALID_USER_TIER', { tier: this.customOptions.tier });

        const command = args.shift(" ");
        if(!command)
            return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });
        
        if(command == 'toggle') {
            let command = args.join(" ");
            if(!command)
                return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });

            try {
                this.client.commands.get(command).toggle();
                return message.react('✅');
            } catch (e) {
                return message.react('❌');
            }
        }

        if(command == 'load') {
            let command = args.join(" ");
            if(!command)
                return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });

            try {
                this.client.commands.load(command);
                return message.react('✅');
            } catch (e) {
                return message.react('❌');
            }
        }

        if(command == 'reload') {
            let command = args.join(" ");
            if(!command)
                return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });

            try {
                this.client.commands.get(command).reload();
                return message.react('✅');
            } catch (e) {
                return message.react('❌');
            }
        }

        if(command == 'unload') {
            let command = args.join(" ");
            if(!command)
                return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` });

            try {
                this.client.commands.get(command).unload();
                return message.react('✅');
            } catch (e) {
                return message.react('❌');
            }
        }
        
        if(command == 'servers') {
            message.channel.send('check console').then(() => this.client.guilds.forEach((g) => console.log(`${g.name} (${g.id}) | Овнер: ${g.owner.user.tag} (${g.owner.user.id})`)));
        }
        if(command == 'eval') {
            try { 
                let evaled = eval(args.join(' ')); 
                if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = evaled
                let eevaled = typeof evaled; 
                evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null });
                const tyype = eevaled[0].toUpperCase() + eevaled.slice(1)
                if(evaled === `undefined`) evaled = `Undefined`
                message.channel.send(
                    `Тип: ${tyype}
                    Выполнено за: ${new Date().getTime() - message.createdTimestamp + 'ms'}
                    \n${evaled}`, {code: 'js', split: '\n'}
                )
                .then(() => message.react("✅"))
            } catch(err) {
                message.channel.send(`\n${err}`, {code: "js", split: "\n"}).then(() => message.react("❎"))}
            }
            
        
    }
    disabledRun(message, args) {
        message.reply(`:x: | Команда отключена разработчиком`)
    }   
};

module.exports = MyCommand;