const { Embed, Command } = require("discore.js");

class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "smug",
      description: "Смущаться",
      usage: null,
    };
  }

  get customOptions() {
    return {
      tier: 1,
      category: "reactions",
    };
  }

  async run(message, args) {
    let img = await utils.neko.sfw.smug();
    let embed = new Embed()
      .setColor("#7289DA")
      .setAuthor(
        `${message.author.username} смущается`,
        message.author.displayAvatarURL
      )
      .setImage(img.url);

    return message.channel.send(embed);
  }
}

module.exports = MyCommand;
