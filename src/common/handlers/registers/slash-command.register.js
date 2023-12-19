const { readdirSync, existsSync } = require('fs')
const Logger = require('../../classes/Logger')

/**
 * @typedef {import("../../classes/GenexClient")} GenexClient
 * @param {GenexClient} client
 */
module.exports = (client) => {
  const projectFolders = readdirSync("./src/main", { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)

  const {
    slashCommands,
    slashCommandArray
  } = client

  for (const folder of projectFolders) {
    if (!existsSync(`./src/main/${folder}/commands/slash`)) continue

    const commandFiles = readdirSync(
      `./src/main/${folder}/commands/slash`
    ).filter((file) => file.endsWith(".js"))

    for (const file of commandFiles) {
      const command = require(`../../../main/${folder}/commands/slash/${file}`)
      slashCommands.set(command.information.name, command)
      slashCommandArray.push(command.information)
      Logger.log("info", `Loaded slash command ${command.information.name}`)
    }
  }
}
