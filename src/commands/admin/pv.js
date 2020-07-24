const { Command,Embed } = require('discore.js');
class MyCommand extends Command {
  get options() {
    return {
        enabled: true,
        name: 'pv',
        description: 'Настройка приватных каналов',
        usage: '<id канала> <id категории>'
    };

}
  get customOptions() {
    return {
        tier: 3,
        category: 'settings'
    };
}
run(message,args){
    let log_channels = message.mentions.channels.first()
    if(utils.check(message.member, 3) == false)
    return utils.error(message, 'INVALID_USER_TIER', { tier: this.customOptions.tier });
    let embed = new Embed()
    Guild.findOne({guildID: message.guild.id},async(err,res) => {
        log_channels = message.guild.channels.cache.get(`${args[0]}`)
        if(!log_channels) return utils.error(message, 'INVALID_USER_TIER', { tier: 'Указаный канал/категория не найдена на данном сервере'});

    res.pvch = log_channels
    res.pvct = args[1]
    res.save(); 
    message.react('☑️')
    
    })
}
disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`)
   }
}
module.exports = MyCommand;