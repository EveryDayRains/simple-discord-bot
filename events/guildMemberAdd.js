const {joinleave, members} = config
var images = ['https://cdn.discordapp.com/attachments/682776196727046154/695246592017694810/tenor.gif', 'https://cdn.discordapp.com/attachments/682776196727046154/695246591535218768/tenor_3.gif', 'https://cdn.discordapp.com/attachments/682776196727046154/695246591162056804/tenor_1.gif','https://cdn.discordapp.com/attachments/682776196727046154/695246590813929482/tenor_4.gif', 'https://cdn.discordapp.com/attachments/682776196727046154/695246590193041428/tenor_2.gif','https://cdn.discordapp.com/attachments/682776196727046154/695246589333078056/tenor_5.gif']
var rand = Math.floor(Math.random() * images.length);
var randomImage = images[rand];
module.exports = (client, member) => {
        if (!member.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
        let joinChannel = client.channels.get(joinleave)
        let ejoin = new Discord.RichEmbed()
        .setTitle(`**Новый участник**`)
        .setDescription(` Привет **${member.user.tag}**, спасибо тебе что зашёл к нам на сервер!<a:FS_meowuwu2:682026865288151109> \n Для того чтобы посмотреть всю информацию о сервере прочитай <#646854552544346112> там и авто роли. \n <#646732331654053898> - обязательный для прочтения. \n <a:FS_nyanCat:678081265420730368> Постоянная ссылка для приглашений друзей: https://discord.gg/ChCW3gC`)
        .setImage(randomImage)
        .setColor('GREEN')
    if (joinChannel) joinChannel.send(ejoin)
    let users = client.channels.get(members);
    if (users) {
        users.setName(`🤹 Кол-во юзеров: ${member.guild.members.filter(m => !m.user.bot).size}`)
         
     }
}



