const Discord = module.require("discord.js");
module.exports.run = async (bot,message,args) => {
    if(!['418712700848439318', '517331770656686080', '409926512754819072'].includes(message.author.id)) return message.channel.send("Вы не имеете доступа к данной команде!");
            if(!args[0]) return message.channel.send("Роль не указана");
        let role = args.join(" ");
        message.guild.members.forEach(member => {
            if(member.roles.has(role)) {
            member.kick(message.author.username);
            message.channel.send(`${member} (${member.user.tag} | ${member.id}) кикнут.`);
            }
            });
        }
        module.exports.help = {
            name: "kickrole"
        };
