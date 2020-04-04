const {onlineid, guildid} = require ("../config.json")
module.exports = async (client) => {

    client.user.setStatus("online"); 
    setInterval(function(){
        switch(Math.ceil(Math.random()*3+1)){ 
          case 1:
          client.user.setActivity(`на ${client.users.size} участника`,{ type: 'WATCHING'})
          break;
          case 2:
          client.user.setActivity(`на луну`,{ type: 'WATCHING'})
          break;
          case 3:
          client.user.setActivity(`на который час`,{ type: 'WATCHING'})
          break;
    }
      },10 * 1000);
          
    
        console.log(`Бот работает под ником: ${client.user.tag}!`);
        client.generateInvite(['ADMINISTRATOR']).then(link =>{
          console.log('Ссылка на бота:', link);
        })

       async function test1() {
       client.channels.find(c => c.id === onlineid).setName(`В сети: ${client.guilds.get(guildid).presences.size}`);
       }; setInterval(test1, 30000)
        
    
    }