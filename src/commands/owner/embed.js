const { Command, Embed } = require("discore.js");

class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "em",
      description: "А зочем тебе эта команда?",
      usage: "<Код с ембед билдера>",
    };
  }

  get customOptions() {
    return {
      tier: 1,
    };
  }
  run(message, args) {
    const text = args.join(" ");
    try {
      const json = JSON.parse(text);
      if ({}.hasOwnProperty.call(json, "thumbnail")) {
        json.thumbnail = { url: json.thumbnail.url };
      }
      if ({}.hasOwnProperty.call(json, "image")) {
        json.image = { url: json.image };
      }
      const plainText = json.plainText || "";
      delete json.plainText;
      const embed = new Embed(json);
      message.channel.send(plainText, embed);
    } catch (err) {
      console.log(err.stack);
    }
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}

module.exports = MyCommand;
