const { categoryID, voiceID, vrole, voicestats} = config
module.exports = async (client, Old, New) => {
    console.log("test")
    if(New.user.bot) return;
    if(Old.user.bot) return;

    if(New.voiceChannelID == voiceID) {
        New.guild.createChannel(New.user.username, 'voice').then((set) => {
            New.setVoiceChannel(New.guild.channels.get(set.id)).then(() => set.setParent(New.guild.channels.get(categoryID)));
            set.overwritePermissions(New.user, {
                'CONNECT': true, 'SPEAK': true,
                'MOVE_MEMBERS': true, 'VIEW_CHANNEL': true,
                'MANAGE_CHANNELS': true, 'MANAGE_ROLES_OR_PERMISSIONS': true,
                'USE_VAD': true, 'PRIORITY_SPEAKER': true
            });
        });
    }

    if(Old.voiceChannel) {
        Old.guild.channels.forEach((channels) => {
                if(channels.parentID == categoryID) {
                    if(channels.id == voiceID) return;
                    if(Old.voiceChannelID == channels.id) {
                        if(Old.voiceChannel.members.size == 0) {
                            channels.delete();
                        }
                    }
                }
        });
    }
    let newUserChannel = New.voiceChannel;
    let oldUserChannel = Old.voiceChannel;
    let voicetext = "Голосовой онлайн: "
    let ch = client.channels.get(voicestats);
    if(newUserChannel && !oldUserChannel){
        ch.setName(`${voicetext}${New.guild.members.filter(m => m.voiceChannel).size}`);
    };
    if(!newUserChannel && oldUserChannel){
        ch.setName(`${voicetext}${New.guild.members.filter(m => m.voiceChannel).size}`);
    };

    let role = New.guild.roles.find(r => r.name == "role name") || New.guild.roles.find(r => r.id == vrole) 
        if (newUserChannel) { New.addRole(role.id) } 
        if (!newUserChannel) { New.removeRole(role.id) } 
  
}