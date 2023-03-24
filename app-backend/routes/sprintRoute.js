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

sprintRouter.post("/addsprint", async (req, res) => {
    const sprint = req.body
    try {
        const S = await SprintModel.find({ sprint: sprint.sprint })
        console.log(S)
        if (S.length > 0) {
            res.send("Already existing Sprint")
        } else {
            const sp = new SprintModel(sprint);
            await sp.save()
            res.send("added new Sprint")
        }
    }
    catch (err) {
        console.log(err)
        res.send("Unable to add sprint", err)
    }
})

sprintRouter.post("/add", async (req, res) => {
    const taskdata = req.body
    try {
        const a = await UserModel.find({ user: taskdata.user })
        console.log(a)
        if (a.length == 0) {
            const us = new UserModel({ user: taskdata.user });
            await us.save()
        }
        const data = new TaskModel(taskdata);
        await data.save()
        res.send("Task added Successfully")
    }
    catch (err) {
        console.log(err)
        res.send("Unable to add task", err)
    }
})

sprintRouter.get("/allsprint", async (req, res) => {
    try {
        const sprints = await SprintModel.find();
        res.send(sprints)
    }
    catch (err) {
        console.log(err)
        res.send("Error in getting data please try again later!")
    }
})

sprintRouter.get("/getsprint/:sprint", async (req, res) => {
    const sprint = req.params.sprint;
    try {
        const sprints = await TaskModel.find({ sprint });
        res.send(sprints)
    }
    catch (err) {
        console.log(err)
        res.send("Error in getting data please try again later!")
    }
})

sprintRouter.get("/alluser", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users)
    }
    catch (err) {
        console.log(err)
        res.send("Error in getting data please try again later!")
    }
})

sprintRouter.get("/getuser/:user", async (req, res) => {
    const user = req.params.user;
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
        await TaskModel.findByIdAndUpdate({ "_id": id }, payload)
        res.send("task updated")
    } catch (error) {
        res.send("unable to update task", error)
    }
})

sprintRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        await TaskModel.findByIdAndDelete({ "_id": id })
        console.log(id)
        res.send("task deleted")
    } catch (error) {
        res.send("unable to delete task", error)
    }
})

sprintRouter.delete("/deleteSprint/:id", async (req, res) => {
    const { id } = req.params
    try {
        await SprintModel.findByIdAndDelete({ "_id": id })
        console.log(id)
        res.send("sprint deleted")
    } catch (error) {
        res.send("unable to delete sprint", error)
    }
})

sprintRouter.delete("/deleteUser/:id", async (req, res) => {
    const { id } = req.params
    try {
        await UserModel.findByIdAndDelete({ "_id": id })
        console.log(id)
        res.send("user deleted")
    } catch (error) {
        res.send("unable to delete user", error)
    }
})

module.exports = { sprintRouter }