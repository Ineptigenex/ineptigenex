const { REST, Routes } = require("discord.js")
const Config = require("../../utils/Config")
const Logger = require("../../classes/Logger")
const { Label } = require("../../utils/Constants")

/**
 * @typedef {import("../../classes/GenexClient")} GenexClient
 * @param {GenexClient} client
 */
module.exports = (client) => {
  client.on("ready", async (client) => {
    const guildIds = client.guilds.cache.map((guild) => guild.id)
    const rest = new REST({ version: "10" }).setToken(Config.TOKENID)

    for (const guildId of guildIds) {
      rest.put(Routes.applicationCommands(Config.CLIENTID, guildId), {
        body: client.slashCommandArray
      })
        .then(() => {
          Logger.info(`Successfully registered application commands for ${guildId}`, { label: Label.Discord })
        })
        .catch((err) => {
          Logger.error(`Error registering application commands for ${guildId}`, { label: Label.Discord })
          Logger.error(err, { label: Label.Discord })
        })
    }
  })
}
