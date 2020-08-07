const { Event } = require('discore.js');
module.exports = class extends Event {
    get options() {
        return {
            name: "voiceStateUpdate",
            enabled: true
        }
    }

    run(oldState, newState) {
        Guild.findOne({guildID: newState.guild.id},async(err,pv) => {
        if (pv.pvch === '0') return
        if (pv.pvch === '0') return
            if(newState.channelID === pv.pvch) {
                newState.guild.channels.create("Комнатка ☁️", {
                  type: "VOICE",
                  parent: pv.pvct,
                  permissionOverwrites: [
                    {
                       id: newState.guild.id, 
                       allow: ["VIEW_CHANNEL"]
                    },
                    {
                      id: newState.member.id, 
                      allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS"]
                    }
                  ]
                }).then(ch => {newState.setChannel(ch) })
              }
              if(oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === pv.pvct && oldState.channelID !== pv.pvch) oldState.channel.delete();
        })
    }
};