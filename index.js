"use strict";
const Discord = require("discord.js");
const client = new Discord.Client();
const http = require('http');
require('dotenv').config();
http.createServer(function (req, res) {}).listen(process.env.PORT || 6000);

/**
 * On new message received - relay to all role
 */
client.on('message', msg => {
    if (msg.channel.name === 'announce' && msg.member.roles.has('199362164408975360')) {
        msg.guild.roles.find("name", "Рассвет").members.forEach(function (member) {
            member.sendMessage(msg.content);
        });    
    }
});

client.login(process.env.BOT_TOKEN);
