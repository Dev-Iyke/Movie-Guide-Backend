const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: {type: String, require: true},
  password: {type: String, require: true},
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  addedAt: { type: Date, default: Date.now },
  role: {type: String, default: 'User'},
}, {Timestamp: true})


const User = mongoose.model("User", userSchema)

module.exports ={User}