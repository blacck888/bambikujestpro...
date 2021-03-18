const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "odrzuc",
    aliases: ["odrzuć"],
    run: async (client, msg, args) => {
        if (!msg.member.roles.cache.has("821739913572909077")) return;

        if (!args[0]) {
            return msg.reply("Podaj id!")
        }

        if (!db.get(`reklama_do_${args[0]}`)) {
            return msg.reply("Nie ma takiej reklamy w bazie danych!")
        }

        if (!args[1]) {
            return msg.reply("Podaj powód!")
        }

        const osoba = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
        .setDescription("Reklama serwera `" + db.get(`reklama_do_${args[0]}_name`) + "` została odrzucona z __**POWODU**__ \n`" + args.slice(1).join(" ") + "`")
        .setFooter(`Weryfikator: ${msg.author.tag} || ${msg.author.id}`, msg.author.displayAvatarURL())
        .setColor("RED")
        client.users.cache.get(db.get(`reklama_do_${args[0]}_osoba`)).send(osoba)

        const kanal_reklam = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
        .setDescription("Reklama tego serwera została odrzucona z __**POWODU**__\n`" + args.slice(1).join(" ") + "`")
        .setColor("RED")
        client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(kanal_reklam)

        const statusy = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
        .setDescription("Reklama serwera `" + db.get(`reklama_do_${args[0]}_name`) + "` została odrzucona z __**POWODU**__ \n`" + args.slice(1).join(" ") + "`")
        .setFooter(`Weryfikator: ${msg.author.tag} || ${msg.author.id}`, msg.author.displayAvatarURL())
        .setColor("RED")
        client.channels.cache.get("821740411675607100").send(statusy)
        db.delete(`reklama_do_${args[0]}_osoba`)
        db.delete(`reklama_do_${args[0]}`)
        db.delete(`reklama_do_${args[0]}_name`)
        msg.reply("Odrzucono!")
    }

}