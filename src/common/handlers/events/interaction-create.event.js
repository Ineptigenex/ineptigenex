const Logger = require("../../classes/Logger")
/**
 * @typedef {import("../../classes/GenexClient")} GenexClient
 * @typedef {import("discord.js").ChatInputCommandInteraction} ChatInputCommandInteraction
 */

/**
 * @param {ChatInputCommandInteraction} interaction
 * @param {GenexClient} client
 */
const slashCommandHandler = async (interaction, client) => {
  const command = client.slashCommands.get(interaction.commandName)

  try {
    await command.execute(interaction)
  } catch (err) {
    Logger.error(err, { label: "Command" })
  }
}

/**
 *
 * @param {GenexClient} client
 */
module.exports = async (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return

    switch (true) {
      case interaction.isChatInputCommand():
        slashCommandHandler(interaction, client)
        break
    }
  })
}
