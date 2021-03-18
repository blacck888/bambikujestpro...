const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "pomoc",
    aliases: [""],
    run: async (client, msg) => {
        const embed = new Discord.MessageEmbed()
    .setAuthor("Menu pomocy!", "https://cdn.discordapp.com/emojis/720400439329292298.gif?v=1")
    .addField("Reklamowe:", "> <a:ar:735602156626771980> `;kanal #kanał` - **Tą komendą ustawisz kanał wysyłania reklam!**\n> <a:ar:735602156626771980> `;reklama <treść>` - **Tą komendą ustawisz reklamę twojego serwera!**")
    .addField("Informacyjne:", "> <a:bellxD:735602128629923941> `;zobacz` - **Pokazuje reklamę serwera**\n> <a:bellxD:735602128629923941> `;linki` - **Wysyła potrzebne linki**")
    .setFooter(`Na życzenie ${msg.author.tag} | ${msg.author.id}`, `${msg.author.displayAvatarURL()}`)
    .setColor(0x0e4ee3)
    msg.channel.send(embed)
    }
}
