const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const { Command, Embed } = require("discore.js");

class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "botstats",
      aliases: ["bs"],
      description: "Просмотр статистики бота",
      usage: "",
    };
  }
  get customOptions() {
    return {
      tier: 1,
    };
  }
  run(message, args) {
    const duration = moment
      .duration(this.client.uptime)
      .format(" D [дней], H [часа(ов)], m [минут]");

    const embed = new Embed()
      .setAuthor(`Информация о боте ${this.client.user.username}`)
      .setColor("RANDOM")
      .setTimestamp()
      .addField(
        "**Основная:** ",
        `\`\`\`asciidoc\n• Серверов       :: ${this.client.guilds.cache.size}\n• Участников    :: ${this.client.users.cache.size}\n• Эмодзи        :: ${this.client.emojis.cache.size}\n• Кол-во команд :: ${this.client.commands.size}\`\`\``
      )
      .addField(
        "**Техническая:** ",
        `\`\`\`asciidoc\n• Пинг          :: ${
          this.client.ws.ping
        }мс\n• ОЗУ исп.      :: ${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(
          2
        )} MB\n• Аптайм бота   :: ${duration}\n• Discord.js    :: v${version}\n• Версия Node   :: ${
          process.version
        }\n• Процессор     :: ${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
        true
      )
      .setFooter(`${this.client.user.username} `, this.client.user.avatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}
module.exports = MyCommand;
