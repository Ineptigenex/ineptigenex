import { config } from '@config/config';
import { logger } from '@utils/logger';
import { Client, GatewayIntentBits } from 'discord.js';

export class InepClient extends Client {
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
        parse: ['everyone', 'roles', 'users'],
        repliedUser: true,
      },
    });
  }

  public async start() {
    // TODO: Register commands and events

    await this.login(config.discord.tokenID);
    logger.info(`Logged in as ${this.user?.tag}`);
  }
}
