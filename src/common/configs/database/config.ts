import { config } from 'dotenv'
const env = config().parsed

export default {
  username: env?.MONGODB_USERNAME,
  password: env?.MONGODB_PASSWORD,
  database: env?.MONGODB_DATABASE,
  host: env?.MONGODB_CLUSTER,
  port: env?.MONGODB_PORT,
}
