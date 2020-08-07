# simple-discord-bot
Простой Discord бот для вашего сервера 

[![Discord](https://discordapp.com/api/guilds/662635194884292611/widget.png)](https://discord.gg/GG9Dkhg)

# Библиотеки
Библиотека для взаимодействия с Discord API - [`discore.js`](https://github.com/zargovv/discore.js) (Based on [DiscordJS](https://github.com/discordjs/discord.js) **v12**)
Библиотека для взаимодействия с MongoDB - [`mongoose`](https://npmjs.com/package/mongoose)

# Как запустить бота? 
Для начала, установите все необходимые библиотеки: ``npm install`` <br>
Затем укажите токены и ссылку для взаимодействия с БД в файле ``.env`` (пример в [``example.env``](./example.env)) <br>
Также, откройте файл ``config.json`` и настройте бота под себя. <br>
```js
{
    "owner": ""// id владельца
}
```
# Создание кластера для базы данных

Вы можете посмотреть как создать кластер для БД [здесь] (./DATABASE.md)

# Запуск бота

* Для запуска бота используйте ``npm start``

* Для запуска через **pm2**:
```diff
+ Добавление и запуск: pm2 start bot.js --name simple-bot
+ Просто запуск: pm2 start simple-bot
+ Перезагрузка: pm2 restart/reload simple-bot
+ Остановка работы: pm2 stop simple-bot
+ Удаление бота (из pm2): pm2 delete simple-bot
+ Автозапуск при старте системы: pm2 save && pm2 startup
```
P.S. Если вы запускаете команду автозапуска не из root-пользователя, убедитесь что у вас есть права на sudo
<br>Либо обратитесь к администратору системы для прописания команды, которую вам даст pm2

**Вы прекрасны!**

# Как сменить стандартный префикс? Для этого вам нужно нажать [сюда](https://github.com/sqdshcom/simple-discord-bot/blob/ece80bbff12119c911a5f07a32e8a11ad0b3b3f8/src/bot.js#L31) и заменить его на свой :3


# Прочее
Темпвойсы были взяты [отсюда](https://github.com/bemovpro/Create-temporary-voice-channel)<br>
Бот имеет недоработки и баги, если Вы нашли один, то открывайте [Issues](https://github.com/sqdshcom/simple-discord-bot/issues)<br>
Если знаете, как пофиксить, то Вам прямиком в [Pull Requests](https://github.com/sqdshcom/simple-discord-bot/pulls)<br>
Будем рады любой помощи! <br>
