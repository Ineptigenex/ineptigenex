import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"

class Logger {
  private static instance: winston.Logger

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.json()
        ),
        transports: [
          new DailyRotateFile({
            filename: 'logs/%DATE%-error.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
          }),
          new DailyRotateFile({
            filename: 'logs/%DATE%-combined.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
          }),
        ],
      })

      if (process.env.NODE_ENV !== 'production') {
        Logger.instance.add(new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.printf((info) => {
              if (info.stack) {
                return `[${info.level}] ${info.message} - ${info.stack}`
              }
              return `[${info.level}] ${info.message}`
            })
          )
        }))
      }
    }

    return Logger.instance
  }
}

export default Logger
