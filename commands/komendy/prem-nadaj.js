const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "prem-nadaj",
    run: async (client, msg, args) => {
        if (msg.author.id !== "603911712734838813") return;

        if (!args[0]) {
            return msg.reply("Podaj id!")
        }

        if (db.get(`premium_${args[0]}`)) {
            return msg.reply("Ten serwer posiada już premium!")
        }

        db.set(`premium_${args[0]}`, "Posiada!") 
        const kanal_reklam = new MessageEmbed()
        .setAuthor("Uwaga!", "https://cdn.discordapp.com/emojis/736575494883115108.gif?v=1")
        .setDescription("Ten serwer uzyskał premium!")
        .setColor("PURPLE")
        client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(kanal_reklam)
        msg.reply("Nadano premium!")

    }
}