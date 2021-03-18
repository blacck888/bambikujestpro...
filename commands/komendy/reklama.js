const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "reklama",
    run: async (client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            const brak_perm = new MessageEmbed()
            .setAuthor("Odmowa dostępu!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
            .setColor("RED")
            .setDescription("`Nie posiadasz permisji (Zarządzanie Serwerem)`")
        return msg.channel.send(brak_perm)
        }

        if (db.get(`reklama_do_${msg.guild.id}`)) {
            const czeka = new MessageEmbed()
            .setAuthor("Wystąpił Problem!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
            .setDescription("`Reklama tego serwera czeka na zweryfikowanie!`")
            .setColor("RED")
            return msg.channel.send(czeka)
        }

        if (!db.get(`kanal_reklama_${msg.guild.id}`)) {
            const brak_kan = new MessageEmbed()
            .setAuthor("Wystąpił problem!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
            .setDescription("`Ten serwer nie posiada kanału reklam!`")
            .setColor("RED")
        return msg.channel.send(brak_kan)
        }

        if (!args[0]) {
            const brak_tresc = new MessageEmbed()
            .setAuthor("Wystąpił Problem!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
            .setDescription("`Podaj treść reklamy!`")
            .setColor("RED")
        return msg.channel.send(brak_tresc)
        }

        if (args.join(" ").includes("@here")) {
            const spieprzaj_pan = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/718809571879157811.gif?v=1")
            .setDescription("`Reklama nie może zawierać here!`")
            .setColor("RED")
            return msg.channel.send(spieprzaj_pan)
           }
        
           if (args.join(" ").includes("@everyone")) {
            const spieprzaj_pan2 = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/718809571879157811.gif?v=1")
            .setDescription("`Reklama nie może zawierać everyone!`")
            .setColor("RED")
            return msg.channel.send(spieprzaj_pan2)
           }
            
           if (args.join(" ").includes("discord.gg/" || "https://discord.gg/" || "discordapp.com/invite/" || "https://discordapp.com/invite/")) {
            const blad_link = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/718809571879157811.gif?v=1")
            .setDescription("`Reklama nie może zawierać linku do serwera ponieważ bot doda go sam!`")
            .setColor("RED")
           return msg.channel.send(blad_link)

	
         if (args.join(" ").length > 1000) {
            const za_duzo = new MessageEmbed()
            .setAuthor("Reklama może mieć max 1000 znaków!")
            .setColor('RED')
        return msg.channel.send(za_duzo)
        }
           }
           msg.channel.createInvite({
            maxAge: 0
            }).then(invite => { 
                db.set(`reklama_do_${msg.guild.id}`, args.join(" ") + `\nhttps://discord.gg/${invite.code}`)
                db.set(`reklama_do_${msg.guild.id}_name`, msg.guild.name)
                db.set(`reklama_do_${msg.guild.id}_osoba`, msg.author.id)
                db.set(`reklama_${msg.guild.id}_serwera`, args.join(" ") + `\nhttps://discord.gg/${invite.code}`)
            
            const reply = new MessageEmbed()
            .setAuthor("Ustawiono!", "https://media.discordapp.net/attachments/735596320861192216/736312209461739650/6181_check_1.gif")
            .setDescription("`Reklama tego serwera została wysłana do weryfikacji!`")
            .setColor(0x0e4ee3)
            msg.channel.send(reply)

            const spr_reklam = new MessageEmbed()
            .setAuthor("Nowa reklama do sprawdzenia!", "https://media.discordapp.net/attachments/735596320861192216/736312209461739650/6181_check_1.gif")
            .setDescription("Serwer: `" + msg.guild.name + " || " + msg.guild.id + "`\nOsoba: `" + msg.author.username + " || " + msg.author.id + "`")
            .addField("Treść:", "`" + db.get(`reklama_do_${msg.guild.id}`) + "`")
            .addField("Zaproszenie kliknij", `[**Zaproszenie**](https://discord.gg/${invite.code})`)
            client.channels.cache.get("821740821937782832").send(spr_reklam)
            client.channels.cache.get("821740821937782832").send("@everyone")

        })
    }
}
