const express = require('express')
const sprintRouter = express.Router()
const { UserModel } = require('../models/userModel')
const { TaskModel } = require('../models/taskModel')
const { SprintModel } = require('../models/sprintModel')


sprintRouter.post("/", async (req, res) => {
    const taskdata = req.body
    try {
        const sprint = await SprintModel.find({ sprint: taskdata.sprint })
        const a = await UserModel.find({ user: taskdata.user })
        console.log(a)
        if (a.length == 0) {
            const us = new UserModel({ user: taskdata.user });
            await us.save()
        }

        if (sprint.length > 0) {
            const data = new TaskModel(taskdata);
            await data.save()
            res.send("Added to the Already existing Sprint")
        } else {
            const data = new TaskModel(taskdata);
            await data.save()
            const sp = new SprintModel({ sprint: taskdata.sprint });
            await sp.save()
            res.send("Created new Sprint and task added Successfully")
        }
    }
    catch (err) {
        console.log(err)
        res.send("Unable to add task", err)
    }
})

sprintRouter.post("/add", async (req, res) => {
    const taskdata = req.body
    try {
        const data = new TaskModel(taskdata);
        await data.save()
        res.send("Task added Successfully")
    }
    catch (err) {
        console.log(err)
        res.send("Unable to add task", err)
    }
})

sprintRouter.get("/sprint", async (req, res) => {
    const sprint = req.query.sprint;
    try {
        const sprints = await TaskModel.find({ sprint });
        res.send(sprints)
    }
    catch (err) {
        console.log(err)
        res.send("Error in getting data please try again later!")
    }
})

sprintRouter.get("/user", async (req, res) => {
    const user = req.query.user;
    try {
        const users = await TaskModel.find({ user });
        res.send(users)
    }
    catch (err) {
        console.log(err)
        res.send("Error in getting data please try again later!")
    }
})


sprintRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        await SprintModel.findByIdAndUpdate({ "_id": id }, payload)
        res.send("task updated")
    } catch (error) {
        res.send("unable to update task", error)
    }
})

sprintRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        await SprintModel.findByIdAndDelete({ "_id": id })
        console.log(id)
        res.send("task deleted")
    } catch (error) {
        res.send("unable to delete task", error)
    }
})

module.exports = { sprintRouter }