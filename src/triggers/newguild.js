const { Trigger } = require("discore.js");
module.exports = class extends Trigger {
  run(message) {
    Guild.findOne({ guildID: message.guild.id }, (err, res) => {
      if (err) return;
      if (!res) {
        let guild = new Guild({ guildID: message.guild.id });
        guild.save();
        return;
      }
    });
  }
};
