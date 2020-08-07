const { Command, Embed } = require("discore.js");

class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "economy",
      description: "Команда для администрации",
      usage: "eco <функция> <пользователь (тег,ид, имя)> <кол-во>",
      aliases: ["eco"],
    };
  }

  get customOptions() {
    return {
      tier: 4,
      category: "economy",
    };
  }

  run(message, args) {
    if (utils.check(message.member, 4) == false)
      return utils.error(message, "INVALID_USER_TIER", {
        tier: this.customOptions.tier,
      });
    let embed = new Embed();
    let member = message.guild.member(
      message.mentions.users.first() ||
        message.guild.members.cache.get(args[1]) ||
        message.guild.members.cache.get(message.author.id)
    );
    if (member.user.bot) return;
    User.findOne(
      { guildID: message.guild.id, userID: member },
      async (err, row) => {
        switch (args[0]) {
          default:
            embed
              .setDescription("Экономика")
              .addField(`Добавление монет.`, "addmoney", true)
              .addField(`Добавление опыта.`, "addxp", true)
              .addField(`Удаление монет.`, "removemoney", true)
              .addField(`Удаление опыта.`, "removexp", true)
              .addField(`Установка монет.`, "setmoney", true)
              .addField(`Установка опыта.`, "setxp", true)
              .addField(
                `Пример:`,
                `eco <функция> <пользователь (тег,ид, имя)> <кол-во>`
              )
              .setColor("#36393f");
            message.channel.send(embed);
            break;

          case "addmoney":
            row.money += args[2];
            row.save();
            embed
              .setDescription(
                `Добавление монет \n Вы успешно добавили ${args[2]} монет пользователю  ${member.user.tag}`
              )
              .setColor("#36393f");
            message.channel.send(embed);

            break;
          case "addxp":
            row.xp += args[2];
            row.save();
            embed
              .setColor("#36393f")
              .setDescription(
                `Добавление опыта \n Вы успешно добавили ${args[2]}xp пользователю ${member.user.tag}`
              );
            message.channel.send(embed);

            break;
          case "removemoney":
            row.money -= args[2];
            row.save();
            embed
              .setDescription(
                `Удаление монет \n Вы успешно удалили ${args[2]} монет у пользователя ${member.user.tag}`
              )
              .setColor("#36393f");
            message.channel.send(embed);

            break;
          case "removexp":
            row.xp -= args[2];
            row.save();
            embed
              .setDescription(
                `Удаление опыта \n Вы успешно удалили ${args[2]}xp пользователю ${member.user.tag}`
              )
              .setColor("#36393f");
            message.channel.send(embed);

            break;
          case "setmoney":
            row.money = args[2];
            row.save();
            embed
              .setDescription(
                `Установка монет \n вы успешно установили ${args[2]} монет пользователю ${member.user.tag}`
              )
              .setColor("#36393f");
            message.channel.send(embed);

            break;
          case "setxp":
            row.xp = args[2];
            row.save();
            embed
              .setDescription(
                `Вы успешно установили ${args[2]}xp пользователю ${member.user.tag}`
              )
              .setColor("#36393f");
            message.channel.send(embed);
            break;
        }
      }
    );
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}

module.exports = MyCommand;
