let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("У Вас недостаточно прав!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.author

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("**Предупреждения пользователя:**")
  .addField("Проверил модератор: ", `<@${message.author.id}>`, true)
  .setColor("#fc6400")
  .addField("Пользователь:", `<@${wUser.id}>`, true)
  .addField("Количество предупреждений:", `[${warns[wUser.id].warns}/6] предупреждений.`, true)

  message.channel.send(warnEmbed);

}
module.exports.help = {
    name: "warns",
    aliases: ['преды'],
    description: 'Список предупреждний у пользователя',
    category: 'Модерирование',
    usages: { 'f.warn @user#0001 причина': 'выдать пред' }
};