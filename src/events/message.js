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

// let messageArray = message.content.split(" ");
// let command = messageArray[0].toLowerCase();
// let args = messageArray.slice(1);
// bot.command = command;
// if (!message.content.startsWith(prefix)) return;
// let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
// if (cmd) cmd.run(bot, message, args);
// }
if(message.content.startsWith(prefix)) {
let messageArray = message.content.split(" ");
let command = messageArray[0].toLowerCase();
let args = messageArray.slice(1);
let cmd = bot.commands.get(command.slice(prefix.length)) || bot.aliases.get(command.slice(prefix.length));
if (cmd) cmd.run(bot, message, args);
}
}