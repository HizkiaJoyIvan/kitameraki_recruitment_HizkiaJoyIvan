import React, { useState } from 'react'
import { TextField, DefaultButton } from '@fluentui/react'
import { IoIosExit } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'

const TaskForm = ({handleExit}) => {

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
        if(res) {
            handleExit()
        }
    } 
    catch(err) {
        console.log(err)
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-blue-200 w-full min-h-[100vh] overflow-hidden top-0 left-0 z-50 fixed bg-opacity-60'>
        <IoIosExit className='text-black text-4xl right-5 top-5 fixed cursor-pointer hover:scale-110 hover:text-red-500' onClick={handleExit}/>
        <div className="bg-white py-2 px-3 rounded-lg shadow-md flex flex-col gap-5 items-center justify-center w-[50%]">
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
    </div>
  )
}

export default TaskForm
