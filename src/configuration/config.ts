import * as path from 'node:path';
import * as dotenv from 'dotenv';
import type { Config, ProcessVariables } from '../core/types/config';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const processVariables: ProcessVariables = process.env as ProcessVariables;

export const config: Config = {
  env: processVariables.NODE_ENV,
  db: {
    username: processVariables.DB_USERNAME,
    password: processVariables.DB_PASSWORD,
    database: processVariables.DB_DATABASE,
    host: processVariables.DB_HOST,
    port: processVariables.DB_PORT,
  },
  discord: {
    tokenID: processVariables.TOKEN_ID,
    clientID: processVariables.CLIENT_ID,
  },
};
