import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import taskImage from '../Images/taskImage.gif'
import '../Pages/EnterDetails.css'

const EnterDetails = () => {
    const [name, setname] = useState("")
    const navigate = useNavigate()

    const submit = () => {
        if (name === "") {
            alert("Please Enter Your Name")
        } else {
            localStorage.setItem("assignee", JSON.stringify(name))
            navigate("/home")
        }

    }
    return (
        <div>
            <h1>Welcome to Task Planner</h1>
            <div id='second'>
                <div id='second-A'>
                <img src={taskImage} alt="task-gif"/>

                </div>
                <div id='second-B'>
                <h3>Make every day count with our task planner.</h3>
                    <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setname(e.target.value)} />
                    <button onClick={submit}>Let's Start</button>
                    <p>The free task planner app is a digital tool designed to help users organize their daily tasks and increase productivity. It provides an intuitive interface for users to input and manage their tasks, assign priorities, set due dates, and track progress.</p>
                    <hr></hr>
                    <b>This task planner app is a useful tool for individuals or teams looking to streamline their workflow and manage tasks more efficiently.</b>
                </div>

            </div>

        </div>
    )
}

export default EnterDetails