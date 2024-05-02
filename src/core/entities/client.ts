import { config } from "@config/config";
import { logger } from "@utils/logger";
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { InepTube } from "./distube";
import SoundCloudPlugin from "@distube/soundcloud";
import SpotifyPlugin from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { InepCommands } from "./commands";
import type { DisTubeOptions } from "distube";
import { InepInteraction } from "./interactions";

export class InepClient extends Client {
  public distube: InepTube | undefined;
  public commands: InepCommands;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
      ],
      failIfNotExists: false,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true,
      },
    });

    this.commands = new InepCommands();
  }

  public async start() {
    logger.info("Starting InepClient...");
    await this.initDistube();
    await this.initCommands();
    await this.initEvents();

    try {
      await this.login(config.discord.tokenID);

      logger.info(`Logged in as ${this.user?.tag}`);
    } catch (error) {
      logger.error("Failed to login to Discord:", error);
      process.exit(1);
    }
  }

  private async initDistube() {
    logger.info("[InepTube] Initializing...");

    this.distube = new InepTube(this, {
      searchSongs: 5,
      searchCooldown: 30,
      leaveOnEmpty: false,
      leaveOnFinish: false,
      leaveOnStop: false,
      ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
      emitNewSongOnly: true,
      plugins: [
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
        new SpotifyPlugin({
          parallel: true,
          emitEventsAfterFetching: true,
          api: {
            clientId: config.spotify?.clientID,
            clientSecret: config.spotify?.clientSecret,
            topTracksCountry: "VN",
          },
        }),
      ],
    } as DisTubeOptions);
  }

  private async initCommands() {
    logger.info("[InepCommands] Initializing...");

    await this.commands.register(this);
  }

  private async initEvents() {
    logger.info("[InepEvents] Initializing...");

    //-----------------------------------------
    logger.info("[InepEvents] Register |ready| event");
    this.on("ready", async () => {
      logger.info("[InepEvents] Triggered |ready| event");

      const rest = new REST().setToken(config.discord.tokenID);
      await rest.put(Routes.applicationCommands(config.discord.clientID), {
        body: this.commands.slash.map((command) => command.builder.toJSON()),
      });

      logger.info("[InepEvents] Triggered |ready| event -- DONE");
    });
    //-----------------------------------------
    logger.info("[InepEvents] Register |interactionCreate| event");
    this.on("interactionCreate", async (interaction) => {
      logger.info(`[InepEvents] Triggered |interactionCreate| event`);
      InepInteraction.execute(this, interaction);
    });
    //-----------------------------------------

    logger.info("[InepEvents] Initialized!");
  }
}
