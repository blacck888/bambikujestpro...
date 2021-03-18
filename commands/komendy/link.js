const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "link",
    aliases: ["invite", "zapros", "zaproś", "sparfy", "bot", "linki"],
    run: async (client, msg) => {
        const linki = new Discord.MessageEmbed()

    .setTitle(":link: Linki do bota Sparfy!")
    .setColor(0x0e4ee3)
    .addField("Support:", "> Serwer support [`Kliknij`](https://discord.gg/C5aJGAqSYa) na tym serwerze uzyskasz pomoc z botem **Matic**")
    .addField("Dodaj bota:", "> Link do naszego bota [**Matic**](https://discord.com/oauth2/authorize?client_id=819101078901620776&permissions=8&scope=bot) \n> ``")
    .addField("Nasza strona internetowa!", ">[**maticbot.pl**](https://maticbot.pl)")
    .setFooter(`Na życzenie ${msg.author.tag} | ${msg.author.id}`, `${msg.author.displayAvatarURL()}`)
    msg.channel.send(linki)
    }
    
}
