const { MessageEmbed } = require("discord.js")
let users_size = 0;
let guilds_size;

module.exports = {
    name: "staty",
    run: async (client, msg) => {
          if (msg.author.id !== "697495233738571807") return;
client.guilds.cache.forEach(g => {
        g.members.cache.forEach(m => {
            users_size++
        })
    })
    guilds_size = client.guilds.cache.size
const staty = new MessageEmbed()
.setTitle("Staty")
.addField("Members", users_size)
.addField("Guilds", guilds_size)
.setColor("BLUE")
msg.author.send(staty)
msg.reply("Wysy³ano na dm")
}
}
