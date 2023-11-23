const Logger = require('./src/common/classes/Logger')
const { Label } = require('./src/common/utils/Constants')
const Database = require('./src/common/utils/Database')

Database.connect()
Logger.log('info', 'Starting Genex...', { label: Label.Main })

