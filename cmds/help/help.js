const Discord = module.require('discord.js');
module.exports.run = async (client, message, args) => {
    try {
        let helpembed = new Discord.RichEmbed()
        .setTitle('Помощь')
        .setDescription('**Если хотите узнать поподробнее о команде напишите `f.help` __`команда`__**')
        .setColor('5CCFFF');
     
        const sendCommandList = (message) => {
            let cmdlist = [];
            let commands = [];
            let command_names = [];

            
            const modules = client.commands.map(command => command.help.category).filter((m, i, self) => self.indexOf(m) === i).forEach(category => {
                cmds = client.commands.filter(command => command.help.category === category);

                let command_names = [];
                cmds.forEach(e => command_names.push(`**\`${e.help.name}\`**`));
                command_names = command_names.join(' ');
                helpembed.addField(`${category}`, `${command_names}`, false);
              });
            return message.channel.send(helpembed)
        }

        const sendCommandInfo = (commandName) => {
            let errEmbed = new Discord.RichEmbed();

            let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
            if(!command) {
                client.sendErrEmbed(errEmbed, `Такой команды нет`);
                    return message.channel.send(errEmbed)
            }

            const usages = [];
            if(!command.help.usages){
                usages.append('Нет примеров использования');
            } else {
                for(const e in command.help.usages) {
                    usages.push(`\`${e}\` => \`${command.help.usages[e]}\``)
                }
            }
            
            let cmdEmbed = new Discord.RichEmbed()
            .setTitle(`Информация о \`!${command.help.name}\``)
            .setDescription(`**${command.help.description}**`)
            .addField('Другие методы использованияЖ', `**${command.help.aliases.join(', ')}**`, false)
            .addField('Пример использования', `**${usages.join('\n')}**`)
            .setColor('FF7A47');

            return message.channel.send(cmdEmbed)
        }
        let cmd = args[0];
        if (!cmd) return sendCommandList(message);
        else return sendCommandInfo(cmd);
    } catch (err) {
        console.warn(err.stack);
    }

};
module.exports.help = {
    name: 'help',
    aliases: [`h`, `помощь`, 'хелп', 'хэлп', 'помогите', 'помогающий', 'помогатор', 'помогитехристаради', 'помощник', 'помогать', 'спасите', 'нупомогите', 'исусспасиисохрани'],
    description: 'Показать список команд / Показать описание команды',
    usages: { 'f.help': 'Показать весь список команд' },
    category: "Помощь"
}; 
