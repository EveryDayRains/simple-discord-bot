const { categoryID, voiceID, vrole, voicestats} = config
module.exports = async (client, oldState, newState) => {
if(newState.channelID === voiceID) {
  newState.guild.channels.create("Комнатка ☁️", {
    type: "VOICE",
    parent: categoryID,
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
  }).then(ch => {newState.setChannel(ch) , ch.setUserLimit(42) })
}
if(oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === categoryID && oldState.channelID !== voiceID) oldState.channel.delete();

    let oldUserChannel = newState.voiceChannel 
    let newUserChannel = newState.voiceChannel 
         if (newUserChannel) { newState.member.roles.add(vrole) } 
         if (!newUserChannel) { newState.member.roles.remove(vrole) } 
  
}