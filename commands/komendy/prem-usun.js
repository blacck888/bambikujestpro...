const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "prem-usun",
    aliases: ["prem-delete"],
    run: async (client, msg, args) => {
        if (msg.author.id !== "603911712734838813") return;

        if (!args[0]) {
            return msg.reply("Podaj id serwera!")
        }

        if (!db.get(`premium_${args[0]}`)) {
            return msg.reply("Ten serwer nie posiada premium!")
        }

        db.delete(`premium_${args[0]}`)
        msg.reply("Usunięto premium serwerowi o id `" + args[0] + "`!")
        const kanal_reklam = new MessageEmbed()
        .setAuthor("Uwaga!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
        .setDescription("Ten serwer stracił premium!")
        .setColor("RED")
        client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(kanal_reklam)
        
    }
}