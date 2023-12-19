const Logger = require("../../../../common/classes/Logger")
const { Label } = require("../../../../common/utils/Constants")

/**
 * @typedef {import("discord.js").ChatInputCommandInteraction} ChatInputCommandInteraction
 */
module.exports = {

  information: {
    name: "user",
    aliases: [],
    description: "Get information about a user",
    usage: "<user>",
    category: "Information"
  },

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute: async (interaction) => {
    try {
      interaction.reply(`Username: ${interaction.user.username}\nID: ${interaction.user.id}`)
    } catch (err) {
      Logger.log("error", err, { label: Label.Command })
    }
  }

}
