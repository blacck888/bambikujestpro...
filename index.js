const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const token = "ODIxNzkyNzc1MDQ0NTk1NzY0.YFI4KQ.il9eRbIz-b0h0Zmh6COPuGbMrV4";

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");



["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('guildCreate', guild => {
    client.user.setPresence({ activity: { name: `Matic! m!pomoc | Serwery: ${client.guilds.cache.size}` }, status: 'online' })
    client.channels.cache.get("821728648566538261").send("**Nowy serwer!**\n Serwer: `" + guild.name + " || " + guild.id + "`\n Osoby: `" + guild.members.cache.size + "`")
})
client.on("guildDelete", guild => {
    client.channels.cache.get("821728648566538261").send("**Wyrzucono bota z serwera!**\n Serwer: `" + guild.name + " || " + guild.id + "`\n Osoby: `" + guild.members.cache.size + "`")
    db.delete(`premium_${guild.id}`)
    db.delete(`reklama_do_${guild.id}`)
    db.delete(`reklama_do_${guild.id}_osoba`)
    db.delete(`reklama_do_${guild.id}_name`)
    db.delete(`reklama_${guild.id}_serwera`)
    db.delete(`kanal_reklama_${guild.id}`)
    client.user.setPresence({ activity: { name: `Matic! m!pomoc | Serwery: ${client.guilds.cache.size}` }, status: 'online' })
})

client.on("ready", async msg => {
    client.user.setPresence({ activity: { name: `Matic! m!pomoc | Serwery: ${client.guilds.cache.size}` }, status: 'online' })
    console.log(`${client.user.tag}`);
    console.log(db.get(`numer`))
    setInterval(() => {
        let numer = db.get(`numer`)
    if (!db.get(`reklama_${numer}`)) {
        return db.set(`numer`, 1), console.log("Koniec kolejki!")
    }
    let id_rek = db.get(`reklama_${numer}_id`)

    client.guilds.cache.forEach(servers_each => {
    if (db.get(`premium_${id_rek}`)) {
        if (!db.get(`kanal_reklama_${servers_each.id}`)) return;
	if (!client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))) return; 
        if (!client.guilds.cache.get(servers_each.id)) return;
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Reklama ${numer} || ${id_rek}`, "https://cdn.discordapp.com/emojis/736575494883115108.gif?v=1")
        .setColor("RANDOM")
        .setDescription(db.get(`reklama_${numer}`))
        client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`)).send(embed)
        
    } else {
        if (!db.get(`kanal_reklama_${servers_each.id}`)) return;
         if (!client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))) return; 
        if (!client.guilds.cache.get(servers_each.id)) return;
        client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`)).send(`**Numer** **(** **${numer}** **)** **Id** **(** **${db.get(`reklama_${numer}_id`)}** **)** \n\n${db.get(`reklama_${numer}`)}`)
    }
})
db.add(`numer`, 1)
    
}, 300000)
});

client.on("message", async message => {
    const prefix = ";"

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.on("message", async message => {
    if (message.content === `<@!${client.user.id}>`) {
        const oznacznie = new MessageEmbed()
        .setAuthor("Potrzebujesz pomocy?", "https://cdn.discordapp.com/emojis/718810296357224468.gif?v=1")
        .setColor(0x0e4ee3)
        .addField("Prefix:", "Mój prefix to `m!`", true)
        .addField("Komendy:", "Spis moich komend znajdziesz pod komendą `;pomoc`", true)
        .addField("Przydatne linki:", "[**Serwer support**](https://discord.gg/C5aJGAqSYa) | [**Bot**](https://discord.com/oauth2/authorize?client_id=819101078901620776&permissions=8&scope=bot) | [Matic Moderation] (https://discord.com/oauth2/authorize?client_id=821735665703190538&permissions=8&scope=bot) | **Strona internetowa**](http://maticbot.pl)")
        .setFooter(`Na życzenie ${message.author.tag}`, message.author.avatarURL())
       return message.channel.send(oznacznie)
    }
})

client.login(token);
