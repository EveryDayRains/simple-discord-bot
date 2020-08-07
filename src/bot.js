global.Discord = require('discord.js')
global.config = require('../config.json')
global.fs = require('fs')
global.utils = require('./utils.js')
global.mongoose = require('mongoose')
global.Guild = require("./data/guild.js");
global.User = require('./data/user.js');

const { Constants } = require("discord.js");
const { Core } = require('discore.js');

const client = new Core({
    folders: {
        commands: 'commands',
        triggers: 'triggers',
        monitors: 'monitors',
        events: 'events'
    },

    prefixOptions: {
        spaceSeparator: false,
        ignoreCase: false,
        mention: true
    },

    commandOptions: {
        argsSeparator: ' ',
        ignoreCase: false,
        ignoreBots: true,
        ignoreSelf: true,
    },

    prefix: '!',
    token: process.env.TOKEN
});

Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
client.public.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('[MONGOBD | OK ] Подключён к базе! ✅');
});