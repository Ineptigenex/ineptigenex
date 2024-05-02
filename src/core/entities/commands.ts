import type { SlashCommand } from "@modules/music/types";
import { Collection } from "discord.js";
import type { InepClient } from "./client";
import { readdirSync } from "node:fs";

export class InepCommands {
  slash: Collection<string, SlashCommand>;
  // button: Collection<string, ButtonCommand>;
  // selectMenu: Collection<string, SelectMenuCommand>;
  // context: Collection<string, ContextMenuCommand>;

  constructor() {
    this.slash = new Collection<string, SlashCommand>();
    // this.button = new Collection<string, ButtonCommand>();
    // this.selectMenu = new Collection<string, SelectMenuCommand>();
    // this.context = new Collection<string, ContextMenuCommand>();
  }

  async register(client: InepClient) {
    const files = readdirSync("./src/core/registers", {
      withFileTypes: true,
    }).filter((file) => file.isFile() && file.name.endsWith("register.ts"));

    for (const file of files) {
      const { default: register } = await import(`../registers/${file.name}`);

      await register(client);
    }
  }
}
