const { reports } = config;
const { Command, Embed } = require("discore.js");
class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "report",
      description: "Отправить репорт на участника сервера",
      usage: "<@пользователь> [приична]",
    };
  }

  get customOptions() {
    return {
      tier: 1,
      category: "moderation",
    };
  }
  run (message, args) {
    let embed = new Embed();
    let reportch = this.client.channels.get(reports);
    let rUser = message.guild.member(message.mentions.users.first());
    if (!rUser) return message.reply("Вы не указали пользователя");
    let reason = args.join(" ").slice(22);
    if (!reason) {
      embed.setDescription(`Вы не указали причину`);
      return message.channel.send(embed);
    }
    embed
      .setDescription(`Репорт`)
      .setColor("#702db6")
      .addField(`Автор жалобы`, `${message.author} \n \`${message.author.id}\``)
      .addField(`Жалоба на`, `${rUser} \n \`${rUser.user.id}\``)
      .addField(`Канал`, message.channel)
      .addField(`Причина`, reason)
      .setThumbnail(rUser.user.avatarURL({ dynamic: true }))
      .setTimestamp();
    reportch.send(embed);
    message.react("719318169281495162");
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}
module.exports = MyCommand;
