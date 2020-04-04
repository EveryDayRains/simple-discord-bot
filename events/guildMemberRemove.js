
const {members} = config
module.exports = (client, member) => {
  let users = client.channels.get(members);
if (users) {
    users.setName(`🤹 Кол-во юзеров: ${member.guild.members.filter(m => !m.user.bot).size}`)
         if (!member.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;

}
}
