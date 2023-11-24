const { Client, GatewayIntentBits, Collection } = require("discord.js")


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
}

module.exports = GenexClient
