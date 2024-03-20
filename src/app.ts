import { config } from './configuration/config';
import { InepClient } from './core/entities/client';

console.log(config);

const client = new InepClient();
await client.start();
