const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(":x: | Вы не имеете доступа к данной команде.");
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
    if(!role) return message.channel.send(":x: | Роль/её ID не указаны.");
    
    let log = [];
    message.guild.fetchMembers();
    message.guild.members.filter((user) => user.roles.has(role)).forEach((user) => { user.kick(); log.push(`Кикнут пользователь **${user.user.tag}** (ID: \`${user.user.id}\`).`); });
    
    return message.channel.send(log.join("\n"), { code: "fix" });
}

module.exports.help = {
    name: "kickrole"
};
