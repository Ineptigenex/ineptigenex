require('dotenv').config({ path: '/app/.env' })

module.exports = {
  TOKENID: process.env.TOKENID || false,
  CLIENTID: process.env.CLIENTID || false,
  MONGO_URI: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority`,
}
