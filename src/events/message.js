const {prefix, ideas} = config
module.exports = async (bot, message) => {
console.log("test - ok")
if(message.author.bot) return;
if(message.channel.type == "dm") return;


 if (message.channel.id === ideas) {
     message.react('👍')
    await message.react('👎')
    return
 }


if(message.content.startsWith(prefix)) {
let messageArray = message.content.split(" ");
let command = messageArray[0].toLowerCase();
let args = messageArray.slice(1);
let cmd = bot.commands.get(command.slice(prefix.length)) || bot.aliases.get(command.slice(prefix.length));
if (cmd) cmd.run(bot, message, args);
}
}
