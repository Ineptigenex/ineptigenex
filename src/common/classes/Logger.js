const { createLogger, format, transports } = require('winston')
const { printf, label } = format
const chalk = require('chalk')
require('winston-daily-rotate-file')

/**
 * Define the format of the console loggers
 */
const consoleFormat = printf(({ level, message, label, timestamp }) => {
  const levelUpper = level.toUpperCase()
  switch (levelUpper) {
    case "INFO":
      message = chalk.green(message)
      level = chalk.black.bgGreenBright(level)
      break

    case "WARN":
      message = chalk.yellow(message)
      level = chalk.black.bgYellowBright(level)
      break

    case "ERROR":
      message = chalk.red(message)
      level = chalk.black.bgRedBright(level)
      break

    default:
      break
  }
  return `[${chalk.black.bgBlue.bold(label)}] [${chalk.black.bgWhiteBright(timestamp)}] [${level}]: ${message}`
})

/**
 * Define the format of the file loggers
 */
const fileFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] [${timestamp}] [${level}]: ${message}`
})

/**
 * Define the transports for the loggers (file and console)
 */
const FileTransports = new transports.DailyRotateFile({
  filename: "logs-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  dirname: "./logs",
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    fileFormat
  ),
  silent: process.env.NODE_ENV === 'test'
})

const ConsoleTransports = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'HH:mm:ss'
    }),
    consoleFormat
  ),
  silent: process.env.NODE_ENV === 'test'
})

/**
 * Create the logger
 * @typedef (winston.Logger) Logger
 */
const Logger = createLogger({
  level: 'info',
  format: format.combine(
    label({ label: 'main' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.splat(),
    consoleFormat
  ),
  transports: [
    FileTransports,
    ConsoleTransports
  ]
})

module.exports = Logger
