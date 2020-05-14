const { inspect } = module.require('util');
const {admin} = config
module.exports.run = async (client, message, args) => {
    
    if (message.author.id !== admin) return;
    try {
        if (!args[0]) return message.channel.send('Я не вижу код. Я не маг, чтобы делать что-то из ничего.');
        try {
            const evaled = await eval(args.join(' '));
            await message.channel.send(inspect(evaled, {depth: 0, maxArrayLength: 50}).replace(client.token, 'undefined'), {code: 'js'}).catch(() => {});
            if (!message.deleted) message.react('✅');
        }
        catch (error) {
            if (!message.deleted) message.react('❌');
            await message.channel.send(error, {code: 'js'}).catch(() => {});
        }
    } catch (err) {
        client.logsErr(err)
    }
};
module.exports.help = {
    name: 'eval',
    description: 'выполняет команду через node и выводит результат, если он меньше 2000 символов.',
    aliases: ['>'],
    category: "Разработка",
    usages: {'client.token': 'помогает избавить вас от лишних проблем. И от лишних серверов', "client.users.forEach(u => u.send('У вас новый уровень на сервере!'))": 'включает режим MEE6'},
    dev: "true"
}; 
