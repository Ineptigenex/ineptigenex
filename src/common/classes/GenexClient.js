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

    this.slashCommands = new Collection()
    this.slashCommandArray = []
  }

  async start() {
    Database.connect()
      .then(() => {
        [
          "slash-command.register"
        ].forEach((register) => {
          require(`../handlers/registers/${register}`)(this)
        })
      })
      .then(() => {
        require('../handlers/registers/client.register')(this)
      })
      .then(() => {
        require('../handlers/events/interaction-create.event')(this)
      })
      .then(() => {
        this.login(process.env.TOKENID)
        Logger.log("info", "Connected to Discord", { label: Label.Discord })
      })
  }

}

module.exports = GenexClient
