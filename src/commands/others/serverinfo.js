const { Embed, Command } = require("discore.js");

class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "serverinfo",
      aliases: ["sinfo", "сервер"],
      description: "Информация об сервере",
      usage: "",
    };
  }

  get customOptions() {
    return {
      tier: 1,
      category: "other",
    };
  }
  run(message) {
    let embed = new Embed()
      .setDescription(`Информация сервера`)
      .setColor("#10c7e2")
      .addField(
        `Участников[${message.guild.members.cache.size}]`,
        `🙍 Пользователей: ${
          message.guild.members.cache.filter((m) => m.user.bot === false).size
        } \n <:bot:635177496773656586> Ботов: ${
          message.guild.members.cache.filter((m) => m.user.bot === true).size
        } \n <:online:635177496773656596>Онлайн: ${
          message.guild.members.cache.filter(
            (x) => x.user.presence.status === "online"
          ).size
        } \n <:402784531356188672:635418347881627658>Афк: ${
          message.guild.members.cache.filter(
            (x) => x.user.presence.status === "idle"
          ).size
        } \n <:dnd:635177496773525508>Не беспокоить: ${
          message.guild.members.cache.filter(
            (x) => x.user.presence.status === "dnd"
          ).size
        } \n <:offline:635177496685314049> Не в сети: ${
          message.guild.members.cache.filter(
            (x) => x.user.presence.status === "offline"
          ).size
        }`,
        true
      )
      .addField(
        `Каналов[${message.guild.channels.cache.size}]:`,
        `<:channel:719662923965792366>Текстовых: ${
          message.guild.channels.cache.filter((c) => c.type == "text").size
        }\n<:voice:719663418856177704>Голосовых: ${
          message.guild.channels.cache.filter((c) => c.type == "voice").size
        }`,
        true
      )
      .addField(
        "<:578122342220431372:668779675652325386>Владелец сервера",
        message.guild.owner,
        true
      )
      .addField(
        "Эмодзи сервера",
        message.guild.emojis.cache
          .map((e) => e.toString())
          .slice(0, 23)
          .join(" ") || "Нет"
      )
      .addField(
        "Роли сервера",
        message.guild.roles.cache
          .map((r) => r.toString().trim())
          .slice(0, 23)
          .join(" ") || "Нет"
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter(
        `Запрос от ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      );

    message.channel.send(embed);
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}
module.exports = MyCommand;
