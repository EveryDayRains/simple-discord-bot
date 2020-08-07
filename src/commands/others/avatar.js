const { Command, Embed } = require("discore.js");

class MyCommand extends Command {
  get options() {
    return {
      enabled: true,
      name: "avatar",
      description: "Просмотр аватарки пользоваетя",
      usage: "[упоминание/ID]",
    };
  }

  get customOptions() {
    return {
      tier: 1,
      category: "other",
    };
  }
  run(message, args) {
    let member = message.guild.member(
      message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.get(message.author.id)
    );

    let embed = new Embed()
      .setColor("#DB9834")
      .setAuthor(`${this.client.user.username}`, this.client.user.avatarURL)
      .setTitle(`${member.user.username}!`)
      .setImage(member.user.avatarURL({ dynamic: true }));
    message.channel.send(embed);
  }
  disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`);
  }
}

module.exports = MyCommand;
