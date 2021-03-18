const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "zobacz",
    run: async (client, msg) => {
        if (!db.get(`reklama_${msg.guild.id}_serwera`)) {
            const embed1 = new MessageEmbed()
            .setAuthor("Reklama serwera " + msg.guild.name, "https://cdn.discordapp.com/emojis/735155495475740772.gif?v=1")
            .setDescription("```Nie ustawiona!```")
            .setColor(0x0e4ee3)
        return msg.channel.send(embed1)

        } else {
            const embed2 = new MessageEmbed()
            .setAuthor("Reklama serwera " + msg.guild.name, "https://cdn.discordapp.com/emojis/735155495475740772.gif?v=1")
            .setColor(0x0e4ee3)
            .setDescription("```" + db.get(`reklama_${msg.guild.id}_serwera`) + "```")
        return msg.channel.send(embed2)
        }
    }
}