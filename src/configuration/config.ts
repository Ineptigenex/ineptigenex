import type { Config, ProcessVariables } from "@core/types";

const processVariables = process.env as ProcessVariables;

export const config: Config = {
  env: processVariables.APP_ENV,
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
  spotify: {
    clientID: processVariables.SPOTIFY_CLIENT_ID,
    clientSecret: processVariables.SPOTIFY_CLIENT_SECRET,
  },
};
