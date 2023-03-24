const express = require('express')
const app = express()
const cors = require('cors')
const { sprintRouter } = require('./routes/sprintRoute')
const { connection } = require('./configs/db')


app.use(cors({ origin: "*" }))
app.use(express.json())
app.use("/", sprintRouter)

app.listen(8080, async (req, res) => {
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log("unable to connect with database")
    }
    console.log("running on port 8080")
})