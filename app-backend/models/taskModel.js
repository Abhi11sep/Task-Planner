const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    sprint: String,
    task: String,
    assignee: String,
    user: String,
    tag: String,
    status: String
})

const TaskModel = mongoose.model("task", taskSchema)

module.exports = { TaskModel }