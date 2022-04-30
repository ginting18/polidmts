const Discord = require("discord.js");
const express = require('express')
const dmBot = new Discord.Client();
const config = require("./config.json");


dmBot.on("ready", async () => {

    console.log(config.READY_MESSAGE);
    dmBot.user.setActivity(config.ACTIVITY_STATUS, {
        type: "Playing"
    });

});

require('http').createServer((req, res) => res.end(`
 |-----------------------------------------|
 |              Informations               |
 |-----------------------------------------|
 |• Alive: 24/7                            |
 |-----------------------------------------|
 |• Author: KRN STORE#6969                   |
 |-----------------------------------------|
 |• Server:   |
 |-----------------------------------------|
 |• Github:  |
 |-----------------------------------------|
 |• License: |
 |-----------------------------------------|
`)).listen(3000);


dmBot.on("message", (message) => {
    
    
    if (message.channel.type === "dm") { 
        var args = message.content.split(" ").slice(0)
        var args = args.slice(0).join(" ")
        var BOT_ID = dmBot.user.id
        var userID = message.author.id
        if (message.content.startsWith(config.PREFIX)) return message.channel.send(":x: Please use commands in real server! :x:") 
        if (message.author.bot) return;
        message.channel.send("This message has been send to the staff! :incoming_envelope:").then(msg => msg.delete(3000))
        if (message.content.startsWith(config.PREFIX)) return
        if (args.length > 1024) return message.reply("Your message content too many characters (1024 Limit) :/") 
        var embed = new Discord.RichEmbed()
            .setColor(config.ORANGE)
            .setAuthor("New Message", "https://cdn.discordapp.com/attachments/502649544622735362/520740243133956138/receive.png")
            .addBlankField(true)
            .addField(`Sent by: ${message.author.username}`, 
            args)
            .addBlankField(true)
            .setTitle("*Message**:")
            .setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.avatarURL)
            .setTimestamp()
        dmBot.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send(embed).catch(console.log(`Message recieved from ${userID}!(${message.author.username})`))
        dmBot.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send({embed: {
            "description": `${config.PREFIX}reply ${message.author.id} <message>`,
        }
    })
    }else

    if (message.content.startsWith(config.PREFIX + "dm")) {
        if (message.author.id !== config.YOUR_ID) return message.reply('You Dont Have Role Required!')
        var args = message.content.split(" ").slice(0)
        var Rargs = message.content.split(" ").slice(2).join(" ")
        var userID = args[1]
        if (isNaN(args[1])) return message.reply("This is not an ID! Make sure to you the user's ID!")
        var embed = new Discord.RichEmbed()
            .setColor(config.ORANGE)
            .setAuthor("New Message", "https://cdn.discordapp.com/attachments/952026678635401276/967544688175362138/20220423_145408_0000.png")
            .addBlankField(true)
            .setDescription(Rargs)
            .addBlankField(true)
            .setTitle("**Message**:")
            .setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.avatarURL)
        dmBot.users.get(userID).send(embed).catch(console.log(`Message was sent to ${userID}!`));
        if (message.author.bot) return;
        message.channel.send("Your Message was Sent!").then(msg => msg.delete(3000)).catch(console.error);
        message.delete();
    }
});


dmBot.login(config.TOKEN);