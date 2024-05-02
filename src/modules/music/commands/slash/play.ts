import type { InepClient } from "@core/entities/client";
import type { InepTube } from "@core/entities/distube";
import type { SlashCommand } from "@music/types";
import { logger } from "@utils/logger";
import {
  type GuildMember,
  SlashCommandBuilder,
  type VoiceBasedChannel,
  type GuildTextBasedChannel,
} from "discord.js";

export const command: SlashCommand = {
  description: {
    name: "play",
    description: "Play a song from YouTube",
    usage: "/play <song>",
  },
  builder: new SlashCommandBuilder()
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The song to play")
        .setDescriptionLocalizations({
          vi: "Bài hát cần phát",
        })
        .setRequired(true),
    )
    .setName("play")
    .setDescription("Play a song from YouTube")
    .setDescriptionLocalizations({
      vi: "Phát một bài hát từ YouTube",
    }),
  execute: async (interaction, client?: InepClient) => {
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;

    try {
      const query = interaction.options.getString("song", true);
      const distube = client?.distube as InepTube;

      await interaction.reply({
        content: `🎵 Searching for \`${query}\`...`,
        ephemeral: true,
      });
      await distube.play(channel as VoiceBasedChannel, query, {
        textChannel: interaction.channel as GuildTextBasedChannel,
        member,
      });
    } catch (error) {
      logger.error(error);
    }
  },
};
