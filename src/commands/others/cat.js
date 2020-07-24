const { Command, Embed } = require('discore.js');
const sa = require('superagent')
class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'cat',
            description: 'Покажет фотографию котика',
            usage: ''
        };
    }
get customOptions() {
    return {
        tier: 1,
        category: 'animals'
    };
}
async run(message){
let embed = new Embed()
var { body } = await sa.get(`http://aws.random.cat//meow`)
    embed.setColor('#fadbc8')
    .setImage(body.file)

message.channel.send(embed)
}

disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`)
}   
};

module.exports = MyCommand;