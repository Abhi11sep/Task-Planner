const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user: String,
})

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }