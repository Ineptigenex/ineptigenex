import DisTube, { type DisTubeOptions } from "distube";
import type { InepClient } from "./client";

export class InepTube extends DisTube {
  constructor(client: InepClient, opts: DisTubeOptions) {
    super(client, opts);
  }
}
