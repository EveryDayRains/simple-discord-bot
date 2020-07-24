const { Command,Embed } = require('discore.js');

class MyCommand extends Command {
  get options() {
    return {
        enabled: true,
        name: 'bio',
        description: 'Установка биорграфии',
        usage: 'bio <текст>'
    };

}
  get customOptions() {
    return {
        tier: 1,
        category: 'economy'
    };
}
  run(message, args) {
    User.findOne({guildID: message.guild.id, userID: message.author.id},async(err,data) => {
    const embed = new Embed()
    const bios = args[1]

    switch (args[0]) {

default:
        embed.setDescription(`**Установка биографии \n Для того чтобы установить биографию, используйте ${this.client.config.guild.get(message.guild.id).prefix}bio set ваш_текст \n для удаление используйте\`${this.client.config.guild.get(message.guild.id).prefix}bio -\`**`)
        .setColor("#36393f")
          message.channel.send(embed)
          break;
case "-":
          data.bio = "Не указано"
          data.save();
          message.react('☑️')
          break;
case "set":
        data.bio = bios
        data.save();
            embed.setDescription(`Установка биографии \n вы успешно установили себе информацию \`${bios}\``)
            .setColor("#36393f")
            message.channel.send(embed)
    break;


     }
  })
}
disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`)
   }
}
module.exports = MyCommand;
