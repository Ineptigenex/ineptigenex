const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
})

module.exports = mongoose.model('User', UserSchema)
