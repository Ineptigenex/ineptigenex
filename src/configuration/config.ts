import type { Config, ProcessVariables } from '../core/types/config';

const processVariables: ProcessVariables = process.env as ProcessVariables;

export const config: Config = {
  env: processVariables.NODE_ENV,
  db: {
    username: processVariables.DB_USERNAME,
    password: processVariables.DB_PASSWORD,
    database: processVariables.DB_DATABASE,
    host: processVariables.DB_HOST,
    port: Number(processVariables.DB_PORT),
  },
  discord: {
    tokenID: processVariables.TOKEN_ID,
    clientID: processVariables.CLIENT_ID,
  },
};
