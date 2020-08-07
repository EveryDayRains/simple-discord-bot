const { Command, Embed } = require("discore.js");
const utils = require("../../utils");
class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "ot",
      description: "Отправить в лс сообщение пользователю",
      usage: "<@упоминание/ID> сообщение",
    };
  }
  get customOptions() {
    return {
      tier: 5,
    };
  }
  run(message, args) {
    let embed = new Embed();
    if (!args[0])
      return utils.error(message, "NO_ARGS", {
        usage: `${
          this.client.config.guild.get(message.guild.id).prefix +
          this.options.name
        } ${this.options.usage}`,
      });
    if (!args[1])
      return utils.error(message, "NO_ARGS", {
        usage: `${
          this.client.config.guild.get(message.guild.id).prefix +
          this.options.name
        } ${this.options.usage}`,
      });
    let rUser = message.guild.member(
      message.mentions.users.first() ||
        bot.users.cache.get(args[0]) ||
        message.guild.members.get(args[0])
    );
    embed.setTitle(`**Ответ разработчика**`).setColor("RANDOM");

    let ot = args.slice(1).join(" ");
    embed.setDescription(`**${ot}**`);
    rUser.send(embed);
    message.channel.send(embed);
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}
module.exports = MyCommand;
