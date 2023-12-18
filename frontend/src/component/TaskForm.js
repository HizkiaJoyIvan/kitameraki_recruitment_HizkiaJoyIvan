import React, { useState } from 'react'
import { TextField, DefaultButton } from '@fluentui/react'

const TaskForm = () => {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const addTask = async () => {
    try {
        const res = await fetch('http://localhost:3200/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                desc
            })
        })
        if(res.OK) {
            setTitle('')
            setDesc('')
            console.log('Added')
        }
    } 
    catch(err) {
        console.log(err)
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-blue-200 gap-5'>
        <TextField 
            className='w-[50%]'
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        <TextField 
            className='w-[50%]'
            label='Description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
        />
        <DefaultButton
            className='w-[25%]'
            onClick={addTask}
        >
            Add
        </DefaultButton>
    </div>
  )
}

export default TaskForm
