"use strict";
const Discord = require("discord.js");
const client = new Discord.Client();
const http = require('http');
http.createServer(function (req, res) {}).listen(process.env.PORT || 6000);

/*
 * Hash - string to #nnnnnn color
 */
var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
};

/**
 * On new message received - relay to all authorized servers
 */
client.on('message', msg => {
    var embed = new Discord.RichEmbed()
            .setAuthor(msg.member.displayName, msg.member.user.displayAvatarURL)
            .setDescription(msg.content)
            .setColor(stringToColour(msg.member.displayName));
    if (typeof msg.attachments.first() !== 'undefined') {
        embed.setImage(msg.attachments.first().url);
    }

    client.guilds.forEach(function (guild) {
        if (client.user.id !== msg.author.id && msg.author.bot == false && guild.id !== msg.guild.id && msg.channel.name == 'general') {
            guild.channels.find('name', 'general').sendEmbed(embed);
        }
    });
});

client.login(process.env.BOT_TOKEN);
