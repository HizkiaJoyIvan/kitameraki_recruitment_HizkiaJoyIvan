const express = require('express')
const fs = require('fs/promises')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())
const PORT = 3200
const TASK_PATH = './task.json'
let tasks = []

async function loadTaskFromFile() {
    try {
        const data = await fs.readFile(TASK_PATH, 'utf8')
        tasks = JSON.parse(data)
    }
    catch(err) {
        console.log(err)
    }
}

async function saveTaskToFile() {
    try {
        await fs.writeFile(TASK_PATH, JSON.stringify(tasks, null, 2))
    } 
    catch(err) {
        console.log(err)
    }
}

loadTaskFromFile()

app.get('/tasks', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        
        const paginatedTasks = tasks.slice(startIndex, endIndex)

        return res.status(200).json({
            message: "Tasks successfully retrieved",
            data: paginatedTasks,
            pageInfo: {
                limit: limit,
                prevPage:  `http://localhost:3200/api/tasks?limit=${limit}&page=${page-1}`,
                currentPage: `http://localhost:3200/api/tasks?limit=${limit}&page=${page}`,
                nextPage: `http://localhost:3200/api/tasks?limit=${limit}&page=${page+1}`
            }
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err
        })
    }
})

app.post('/tasks', (req, res) => {
    try {
        const { title, desc } = req.body
    
        if(!title || !desc) {
            return res.status(400).json({
                message: "Field should not be empty"
            })
        }
    
        const newTask = { id: tasks.length+1, title, desc }
        tasks.push(newTask)
        saveTaskToFile()
        return res.status(200).json({
            message: "Task successfully added"
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err
        })
    }
})

app.delete('/tasks/:id', (req, res) => {
    try {   
        const taskID = parseInt(req.params.id)
        tasks = tasks.filter((task) => task.id !== taskID)
        saveTaskToFile()
        return res.status(200).json({
            message: "Task deleted successfully"
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err
        })
    }
})

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})