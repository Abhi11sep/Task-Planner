const mongoose = require('mongoose')

const sprintSchema = mongoose.Schema({
    sprint: String,
})

const SprintModel = mongoose.model("sprint", sprintSchema)

module.exports = { SprintModel }