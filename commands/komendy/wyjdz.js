const Discord = require("discord.js")

module.exports = {
    name: "wyjdz",
    run: async (client, msg, args) => {
        if (msg.author.id !== "603911712734838813")  return;

        if (!args[0]) {
            return msg.reply("Podaj id!")
        }

        if (!client.guilds.cache.get(args[0])) {
            return msg.reply("Bot nie jest na serwerze o id `" + args[0] + "`!")
        }

        client.guilds.cache.get(args[0]).leave()
        msg.reply("Bot wyszedł!")
    }
}
