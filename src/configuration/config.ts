import * as path from 'node:path';
import * as dotenv from 'dotenv';
import type { Config, ProcessVariables } from '../core/types/config';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const processVariables = process.env as ProcessVariables;

export const config: Config = {
  env: processVariables.NODE_ENV,
  db: {
    username: processVariables.MONGODB_USERNAME,
    password: processVariables.MONGODB_PASSWORD,
    database: processVariables.MONGODB_DATABASE,
    host: processVariables.MONGODB_HOST,
    port: processVariables.MONGODB_PORT,
  },
  discord: {
    tokenID: processVariables.TOKENID,
    clientID: processVariables.CLIENTID,
  },
};
