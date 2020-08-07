const { Event } = require("discore.js");
module.exports = class extends Event {
  run() {
    this.client.user.setPresence({
      activity: { type: 3, name: `на луну | ${this.client.prefix + "help"}` },
    });
    console.log(`Бот работает под ником: ${this.client.user.tag}!`);
  }
};
