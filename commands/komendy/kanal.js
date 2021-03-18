const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")


module.exports = {
    name: "kanal",
    aliases: ["kanał"],
    run: async (client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            const permisja = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/718809571879157811.gif?v=1")
            .setDescription("`Nie posiadasz permisji (Zarządzanie Serwerem)`")
            .setColor("RED")
        return msg.channel.send(permisja)
        }
    
        const men_kan = 
        msg.guild.channels.cache.get(args[0]) ||
        msg.guild.channels.cache.find(x => x.name === args.join(" ")) ||
        msg.mentions.channels.first();
    
        if (!men_kan) {
            const blad_kanal = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/718809571879157811.gif?v=1")
            .setDescription("`Musisz oznaczyć kanał!`")
            .setColor("RED")
        return msg.channel.send(blad_kanal)
        }
    
        if (!msg.guild.channels.cache.get(men_kan.id)) {
            const blad_kanal2 = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/718809571879157811.gif?v=1")
            .setDescription("`Musisz oznaczyć kanał!`")
            .setColor("RED")
        return msg.channel.send(blad_kanal2)
        }
    
        if (men_kan.type !== "text") {
            const no_oznacz_ten_kanal_deklu = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/718809571879157811.gif?v=1")
            .setDescription("`Musisz oznaczyć kanał!`")
            .setColor("RED")
            return msg.channel.send(no_oznacz_ten_kanal_deklu)
        }
    
        db.set(`kanal_reklama_${msg.guild.id}`, men_kan.id)
    
        const embed = new Discord.MessageEmbed()
        .setAuthor("Ustawiono!", "https://cdn.discordapp.com/emojis/718810296357224468.gif?v=1")
        .setDescription("`Ustawiono kanał reklam!`")
        .setColor(0x0e4ee3)
        await msg.channel.send(embed), men_kan.setTopic(" Reklamy wysyłane przez bota Matic!")
    
    
    }
}