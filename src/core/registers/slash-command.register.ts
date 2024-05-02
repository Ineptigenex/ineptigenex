import type { InepClient } from "@entities/client";
import { logger } from "@utils/logger";
import { readdirSync, existsSync } from "node:fs";

export default async (client: InepClient) => {
  logger.info("[SlashCommandRegister] Registering slash commands...");

  const folders = readdirSync("./src/modules", { withFileTypes: true }).filter((dir) =>
    dir.isDirectory(),
  );

  for (const folder of folders) {
    if (!existsSync(`./src/modules/${folder.name}/commands/slash`)) continue;
    const files = readdirSync(`./src/modules/${folder.name}/commands/slash`, {
      withFileTypes: true,
    }).filter((file) => file.isFile() && file.name.endsWith(".ts"));

    for (const file of files) {
      const { command } = await import(`@modules/${folder.name}/commands/slash/${file.name}`);
      client.commands?.slash?.set(command.description.name, command);
      logger.info(`** ${command.description.name}: ${command.description.description} **`);
    }
  }

  logger.info("[SlashCommandRegister] Slash commands registered!");
};
