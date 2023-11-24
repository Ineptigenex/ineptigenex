const { MONGO_URI } = require('./Config')
const mongoose = require('mongoose')
const Logger = require('../classes/Logger')
const { Label } = require('./Constants')

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    Logger.log('info', 'Connected to MongoDB', { label: Label.Database })
  } catch (err) {
    Logger.log('error', 'Error connecting to MongoDB', { label: Label.Database })
    Logger.log('error', err, { label: Label.Database })
    process.exit(1)
  }
}

module.exports = Database = {
  connect
}
