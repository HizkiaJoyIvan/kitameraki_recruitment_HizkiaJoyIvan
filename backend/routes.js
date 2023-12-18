const express = require('express')
const fs = require('fs/promises')
const { default: App } = require('../frontend/src/App')

const TASK_PATH = './task.json'
let tasks = []

async function loadTaskFromFile() {
    try {
        const data = fs.readFile(TASK_PATH, 'utf-8')
        console.log(data)
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

