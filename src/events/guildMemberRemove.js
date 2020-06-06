const { members } = config

module.exports = (client, member) => {
  const users = client.channels.get(members);
  if (users) {
      if (!member.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
      users.setName(`🤹 Кол-во юзеров: ${member.guild.members.filter(m => !m.user.bot).size}`)
  }
}
