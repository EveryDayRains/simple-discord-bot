const { Command, Embed } = require('discore.js');
const sa = require('superagent')
class MyCommand extends Command {
    get options() {
        return {
            enabled: true,
            name: 'dog',
            description: 'Покажет фотографию собаки',
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
    var { body } = await sa.get(`https://random.dog/woof.json`)
        embed.setColor('#fadbc8')
        .setImage(body.url)
    
    message.channel.send(embed)
}
disabledRun(message, args) {
    message.reply(`:x: | Команда отключена разработчиком`)
   }   
};
   
module.exports = MyCommand;