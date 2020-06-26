const {logschannel} = config
let warns = JSON.parse(fs.readFileSync("./src/warnings.json", "utf8"));
module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("у Вас нет разрешения на использование данной команды!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("");
  if (!wUser.message.author) return; message.reply("Суицыд, не выход")  
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("я не могу выдать предупреждение данному пользователю.");
  let reason = args.join(" ").slice(22);
  if (!reason) { reason = "Не указана" }

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns--;

  fs.writeFile("./src/warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.MessageEmbed()
  .setDescription("Снятие предупреждения у пользователя:")
  .addField("Модератор: ", `<@${message.author.id}>`, true)
  .setColor("#fc6400")
  .addField("Убрал предупреждение у:", `<@${wUser.id}>`, true)
  .addField("Канал:", message.channel, true)
  .addField("Количество предупреждений:", warns[wUser.id].warns, true)
  .addField("Причина:", reason, true);

  await message.channel.cache.send(warnEmbed)
  await client.channels.cache.get(logschannel).send(warnEmbed)


}
module.exports.help = {
name: "unwarn",
aliases: ['снятьпред'],
description: 'Снять пред участнику ',
category: 'Модерирование',
usages: { 'f.unwarn @user#0001 причина': 'снять пред' }
};
