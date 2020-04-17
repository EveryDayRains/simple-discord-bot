const Discord = module.require("discord.js");
module.exports.run = async (bot,message,args) => {
    if(!['ID1', 'ID2'].includes(message.author.id)) return message.channel.send("Вы не имеете доступа к данной команде!");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
};
module.exports.help = {
    name: "say"
};
