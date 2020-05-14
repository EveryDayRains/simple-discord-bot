
const {members} = config
module.exports = (client, member) => {
  if (!member.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
  let users = client.channels.cache.get(members);
  if (users) {
    users.setName(`🤹 Кол-во юзеров: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
    }
}

