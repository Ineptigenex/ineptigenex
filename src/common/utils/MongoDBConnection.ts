import mongoose, { Mongoose, ConnectOptions } from 'mongoose'
import { databaseConfig } from '../configs'
import Logger from './Logger'
const logger = Logger.getInstance()

class MongoDBConnection {
  private static instance: Mongoose
  private static readonly uri: string = `mongodb://${databaseConfig.host}:${databaseConfig.port}`
  private static readonly options: ConnectOptions = {
    dbName: databaseConfig.database,
    user: databaseConfig.username,
    pass: databaseConfig.password
  }

  public static async getInstance(): Promise<Mongoose> {
    if (!MongoDBConnection.instance) {
      try {
        MongoDBConnection.instance = await mongoose.connect(MongoDBConnection.uri, MongoDBConnection.options)
        logger.info('MongoDB :::: Connect :::: Successfully')
      } catch (error) {
        logger.error('MongoDB :::: Connect :::: ', error)
        process.exit(1)
      }
    }

    return MongoDBConnection.instance
  }
}

export default MongoDBConnection
