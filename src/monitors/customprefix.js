const { Event } = require('discore.js');
module.exports = class extends Event {
    get options() {
        return {
            name: "message",
            enabled: true
        }
    }
    run(message){
        if (message.channel.type == "dm") return;
        Guild.findOne({guildID: message.guild.id}, (err, res) => {
            if(err || !res) return;
            this.client.config.guild.set(message.guild.id, {
                prefix: res.prefix      
            });
        });
    }
}