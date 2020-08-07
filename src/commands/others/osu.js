const { Command, Embed } = require("discore.js");
class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "osu",
      description: "Покажет статистику пользователя из osu!",
      usage: "<ник>",
    };
  }
  get customOptions() {
    return {
      tier: 1,
      category: "other",
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
    utils.osu.getUser({ u: args[0] }).then((user) => {
      embed
        .setAuthor("Информация о пользователе в osu!")
        .addField(
          "Ник",
          `[${user.name}](https://osu.ppy.sh/users/${user.id})`,
          true
        )
        .addField("Страна", user.country, true)
        .addField("Уровень", Math.round(user.level), true)
        .addField("Точность", `${user.accuracyFormatted}`, true)
        .addField("SS", `${user.counts.SS}`, true)
        .addField("S", `${user.counts.S}`, true)
        .addField("A", `${user.counts.A}`, true)
        .addField("PP", Math.round(user.pp.raw), true)
        .addField("Ранк", `#${user.pp.rank}`, true)
        .addField("Ранк в стране", `#${user.pp.countryRank}`, true)
        .addField("Набрано скоров", user.counts.plays, true)
        .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
        .setColor("#f47fff");
    });
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}
module.exports = MyCommand;
