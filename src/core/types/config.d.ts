export enum Environment {
  Development = "development",
  Production = "production",
  Local = "local",
  Test = "test",
}

export interface Config {
  env: Environment;
  db: DBConfig;
  discord: DiscordConfig;
  fileSystem?: FileSystemConfig;
  spotify?: SpotifyConfig;
}

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

export interface DiscordConfig {
  tokenID: string;
  clientID: string;
}

export interface ProcessVariables extends NodeJS.ProcessEnv {
  APP_ENV: Environment;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PORT: number;
  TOKEN_ID: string;
  CLIENT_ID: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
}

export interface SpotifyConfig {
  clientID: string;
  clientSecret: string;
}

// export interface FileSystemConfig {}
