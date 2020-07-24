const { Command,Embed } = require('discore.js');
const utils = require('../../utils');
const talkedRecently = new Set();
class MyCommand extends Command {
    get options() {
    return {
        enabled: true,
        name: 'cookie',
        description: 'Подарить печенку пользователю',
        usage: '<@упоминание/ID>'
    };

}
  get customOptions() {
    return {
        tier: 1,
        category: 'economy'
    };
}
run(message,args){
    let embed = new Embed()
    if (talkedRecently.has(message.author.id)) {return utils.error(message, 'COOKIE')} 
    let member = message.guild.member(message.mentions.users.first()|| message.guild.members.cache.get(args[0]))
        if(!member)
        return utils.error(message, 'NO_ARGS', { usage: `${this.client.config.guild.get(message.guild.id).prefix + this.options.name} ${this.options.usage}` }); 
        if(member.user.bot) return;
        if(member.id == message.author.id){ return utils.error(message, 'USER_HAS_YOUR_TIER', {message: "Нельзя дать печеньку самому себе 3:"})}
        embed.setColor("#36393f")
        embed.setDescription(`${message.author.username} подарил печенку ${member.user.username} :3`)
        embed.setFooter(`${this.client.config.guild.get(message.guild.id).prefix}cookie @упоминание/ID`)
    message.channel.send(embed)
    User.findOne({guildID: message.guild.id, userID: member},async(err,row) => {
    row.cookie += 1
    row.save()
    
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 60 * 1000 * 10);

    
    })

}
disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`)
   }
}
module.exports = MyCommand;