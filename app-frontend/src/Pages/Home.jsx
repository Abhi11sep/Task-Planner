import React, { useEffect, useState } from 'react'
import TaskPlanner from '../Images/TaskPlanner.png'
import '../Pages/Home.css'

const getSprint = () => {
    return fetch('http://localhost:8080/allsprint')
        .then((res) => res.json())
}
const getUser = () => {
    return fetch('http://localhost:8080/alluser')
        .then((res) => res.json())
}
const getParticularSprint = (sprint) => {
    return fetch(`http://localhost:8080/getsprint/${sprint}`)
        .then((res) => res.json())
}
const getParticularUser = (user) => {
    return fetch(`http://localhost:8080/getuser/${user}`)
        .then((res) => res.json())
}

const Home = () => {
    const [userName, setUserName] = useState("")
    const [assigneeName, setAssigneeName] = useState("")
    const [taskName, setTaskName] = useState("")
    const [tag, setTag] = useState("")
    const [sprint, setSprint] = useState([])
    const [newSprint, setNewSprint] = useState([])
    const [user, setUser] = useState([])
    const [particularSprint, setParticularSprint] = useState([])
    const [x, setX] = useState("")
    const [y, setY] = useState("")

    useEffect(() => {
        getSprint().then((res) => setSprint(res))
        getUser().then((res) => setUser(res))
    }, [])

    const handleTask = (sprint) => {
        (localStorage.setItem("sprint", JSON.stringify(sprint)));
        setX(`${sprint} sprint`)
        setY(sprint)
        getParticularSprint(sprint).then((res) => setParticularSprint(res))
    }

    const handleUser = (user) => {
        setX(`${user} user`)
        setY(user)

        getParticularUser(user).then((res) => setParticularSprint(res))
    }

    const addnew = () => {
        fetch('http://localhost:8080/addsprint', {
            method: "POST",
            body: JSON.stringify({ sprint: newSprint }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        window.location.reload()
    }

    const addNewTask = () => {
        let s = JSON.parse(localStorage.getItem("sprint")) || "";
        const obj = {
            sprint: s,
            task: taskName,
            assignee: assigneeName,
            user: userName,
            tag: tag,
            status: "Pending"
        }
        console.log(obj)
        fetch('http://localhost:8080/add', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    let name = JSON.parse(localStorage.getItem("assignee")) || "";
    console.log(sprint, user, particularSprint, x,y,typeof y)

    return (
        <div>
            <div id='sectionA'>
                <img src={TaskPlanner} alt="logo_image" width={80} />
                <h2>Welcome {name}</h2>
            </div>

            <div id='sectionB'>
                <div id='sectionB1'>
                    <h2>All Sprints</h2>
                    {sprint.map((el) => (
                        <div key={el._id}>
                            <p onClick={() => handleTask(el.sprint)}>{el.sprint}</p>
                        </div>
                    ))}
                    <div id='new_sprint'>
                        <input id='input_new_sprint' type="text" placeholder='Add new Sprint' value={newSprint} onChange={(e) => setNewSprint(e.target.value)} />
                        <button id='input_sprint' onClick={addnew}>+</button></div>

                </div>

                <div id='sectionB2'>
                    <h1>{x}'s tasks</h1>
                    {particularSprint.map((el) => (
                        <div key={el._id} id="main">
                            <p>TASK : {el.task}</p>
                            <p>ASSIGNEE : {el.assignee}</p>
                            <p>TASK TAG : {el.tag}</p>
                            <p>STATUS : {el.status}</p>
                            <p>USER : {el.user}</p>
                            <p></p>
                            <button id='remove'>Toggle Task Status</button>
                            <button id='remove'>Change Assignee Name</button>
                            <button id='remove'>Remove Task</button>
                        </div>
                    ))}
                    <input id='inputting' type='text' placeholder='Enter Task' value={taskName} onChange={(e) => setTaskName(e.target.value)} />

                    <input id='inputting' type='text' placeholder='Enter Assignee' value={assigneeName} onChange={(e) => setAssigneeName(e.target.value)} />
                    <br />
                    <input id='inputting' type='text' placeholder='Enter User' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <select id='inputting' onChange={(e) => setTag(e.target.value)}>
                        <option value="">Please Select Task Tag</option>
                        <option value="bug">bug</option>
                        <option value="feature">feature</option>
                        <option value="story">Story</option>
                    </select>
                    <br />
                    <button id='addbtn' onClick={() => { addNewTask(); handleTask("code"); }}>Add New Task</button>
                </div>
                <div id='sectionB3'>
                    <h2>All Users</h2>
                    <p style={{ fontSize: '15px', marginTop: '-20px', paddingRight: '12px' }}>Watch their tasks</p>
                    {user.map((el) => (
                        <div key={el._id}>
                            <p onClick={() => handleUser(el.user)}>{el.user}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home