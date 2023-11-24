const { Client, GatewayIntentBits, Collection } = require("discord.js")
const Database = require("../utils/Database")
const Logger = require("./Logger")
const { Label } = require("../utils/Constants")

/**
 * @typedef {import("discord.js").Collection<string, import("discord.js").SlashCommandBuilder>} SlashCollection
 */

class GenexClient extends Client {

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
      ],
      failIfNotExists: false,
      allowedMentions: {
        parse: [ "everyone", "roles", "users" ],
        repliedUser: true
      }
    })

    /**
     * @type {SlashCollection}
     */
    this.slashCommands = new Collection()
  }

  async start() {
    Database.connect()
      .then(() => {
        this.login(process.env.TOKENID)
      })
      .then(() => {
        Logger.log("info", "Connected to Discord", { label: Label.Discord })
      })
  }

}

module.exports = GenexClient
