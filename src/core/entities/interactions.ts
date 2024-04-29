import { type ChatInputCommandInteraction, type Interaction } from "discord.js";
import type { InepClient } from "./client";

export class InepInteraction {

  static async execute(client: InepClient, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      await this.execCICInteraction(client, interaction)
    }
  }

  private static async execCICInteraction(client: InepClient, interaction: ChatInputCommandInteraction) {
    const execCommand = client.commands.slash.get(interaction.commandName);
    if (!execCommand) return;

    await execCommand.execute(interaction, client);
  }

  //... other Interaction
}