const {admin} = config
module.exports.run = async (client,message,args)=>{
    if(message.author.id !== admin ) return;
    message.delete(200)
    try {
        message.channel.send(`Выполнение...`).then(x =>{
        x.edit('```\n'+String(require('child_process').execSync(String(args.join(' ').slice(0, 2000))) + ' ').toString('utf-8') + '```')
    })
    } catch(err) {
        message.channel.send(err)
    }
  
}

module.exports.help = {
    name: 'shell',
    aliases: [`$`],
    description: 'Выполнить команду в терминал',
    usages: { '$ код': 'Отправит код в терминал сервера' },
    category: "Разработка"
}