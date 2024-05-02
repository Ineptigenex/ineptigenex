import type { InepClient } from "@core/entities/client";
import type { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

interface Command {
  description: {
    name: string;
    description: string;
    usage: string;
  };
  execute: (interaction: Interaction) => Promise<void>;
}

export interface SlashCommand extends Command {
  builder: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction, client?: InepClient) => Promise<void>;
}
