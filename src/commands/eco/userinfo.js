const { Command, Embed } = require('discore.js');
const strftime = require('strftime')
class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'userinfo',
            description: 'Магазин ролей',
            usage: 'userinfo [@упоминание/id]',
            aliases: ['ui','p','гш','з','гыукштащ']
        };
    }

get customOptions() {
    return {
        tier: 1,
        category: 'economy'
    };
}
run(message,args){
    let member = message.guild.member(
        message.mentions.users.first()
        || message.guild.members.cache.get(args[0])
        || message.guild.members.cache.get(message.author.id)
    );
    if(member.user.bot) return;
    User.findOne({guildID: message.guild.id, userID: message.author.id},async (err,row) => {

    let xp = row.exp

    let money = row.money
    let msgs = row.msgs
    let desc = row.bio
    let cookies = row.cookie
    

    // if (marks === undefined ) marks = 'Нет'
    
       const devices = {
          desktop: "Компьютер",
          web: "Браузер",
          mobile: "Телефон"
       }
       const statuses = {
          online: "<:online:635177496773656596> ",
          idle: " <:402784531356188672:635418347881627658>",
          dnd: "<:dnd:635177496773525508>",
          offline: "<:offline:635177496685314049> Не в сети",
          invisible: "<:offline:635177496685314049> Не в сети"
       }
       let statuss = "";
           if(member.presence.clientStatus && Object.keys(member.presence.clientStatus).length > 0) {
             for (let device in member.presence.clientStatus) {
              statuss += `${statuses[member.presence.clientStatus[device]]} ${devices[device]}\n`
             }
           } else {
            statuss = statuses[member.presence.status]
           }
    
      let day = 1000 * 60 * 60 * 24
      let date1 = new Date(message.createdTimestamp)
      let date2 = new Date(member.createdTimestamp)
      let date3 = new Date(message.guild.member(member).joinedTimestamp)
    
      let embed = new Embed()
        .setAuthor('Информация о пользователе')
        .addField('Имя', member.user.username, true)
        .addField("Тег", member.user.discriminator, true)
        .addField("ID", member.id, true)
        .addField('Статус', `${statuss}`, true)
        .addField('Дата регистрации', `${strftime('%d.%m.%Y в %H:%M', new Date(member.user.createdTimestamp))}`, true)
        .addField("Дата вступления", `${strftime('%d.%m.%Y в %H:%M', new Date(message.guild.member(member).joinedTimestamp))}`, true)
        .addField("BOT?", member.bot ? 'Да' : 'Нет', true)
        .setColor("#36393f")
        .addField("Уровень", `${row.level} ур. \`[${row.xp}/${parseInt(row.level) + (parseInt(1)) * 250}] XP\``, true)
        .addField("Баланс", money, true)
        .addField("Описание", desc, true)
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        message.channel.send(embed)
    
    
    
          })
    
      
        }
disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`)
}   
};

module.exports = MyCommand;