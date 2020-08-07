const cooldown = new Set();
const { Trigger, Embed } = require("discore.js");
module.exports = class extends Trigger {
  run(message) {
    User.findOne(
      { guildID: message.guild.id, userID: message.author.id },
      (err, res) => {
        if (err)
          return message.channel.send(
            `\`[❌DataBase]\` Произошла ошибка при добавлении пользователя в базу-данных`
          );
        if (!res) {
          let user = new User({
            guildID: message.guild.id,
            userID: message.author.id,
          });
          user.save();
        } else {
          const xp = {
            current: res.xp,
            level: res.level,
            newLevel: parseInt(res.level) + parseInt(1),
            forNewLevel: parseInt(res.level) + parseInt(1) * 250,
          };
          if (!cooldown.has(message.author.id)) {
            if (xp.current >= parseInt(res.level) + parseInt(1) * 250) {
              const embed = new Embed()
                .setColor("#ca8080")
                .setAuthor(
                  this.client.user.username,
                  this.client.user.displayAvatarURL({ dynamic: true })
                )
                .setThumbnail(
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setDescription(
                  `${message.author},Поздравляем, вы повысили свой уровень до **${xp.newLevel}**!`
                );
              res.xp = "0";
              res.level += 1;
              res.save();
              return message.author.send(embed);
            } else {
              const newXP = this.client.public.random(15, 25);
              let coinsToUser = this.client.public.random(1, 6);
              res.xp += newXP;
              res.money += coinsToUser;
              res.save();
              cooldown.add(message.author.id);
              return setTimeout(() => {
                cooldown.delete(message.author.id);
              }, 1000 * 60);
            }
          } else return;
        }
      }
    );
  }
};
