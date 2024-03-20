import { Client, Events, GatewayIntentBits } from 'discord.js';

import { logger } from './shared/utils/logger';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  logger.info(`Logged in as ${c.user?.tag}`);
});
client.login(process.env.TOKENID);
