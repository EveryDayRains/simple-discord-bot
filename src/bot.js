global.Discord = require('discord.js');
global.client = new Discord.Client(),
global.config = require('../config.json')
global.fs = require('fs')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection();

    fs.readdir('./cmds', (err, files) => { 
        if (err) console.log(err)
      
        files.forEach((element,iterator) => {
            if(!element.includes(".")) {
                fs.readdir(`./cmds/${element}`,(err,sub_files)=>{
                    sub_files.forEach((elem,iterator)=>{
                        let props = require(`./cmds/${element}/${elem}`);
                        client.commands.set(props.help.name, props);
                        const alias = props.help.aliases
                        for (i = 0; i < alias.length; i++) {
                            client.aliases.set(alias[i], props);
                        }
                        console.log(`[BOOT]${props.help.name} ✅`)
                    })
                }) 
            }
        }) 
      })

fs.readdirSync('./events/').filter(file => file.endsWith('.js')).forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
});
  
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.login(process.env.TOKEN)