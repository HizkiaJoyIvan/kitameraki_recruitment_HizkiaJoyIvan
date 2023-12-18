import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa6"
import { MdModeEditOutline } from "react-icons/md"

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3200/tasks", {
                    method: "GET"
                })
                const data = await res.json()
                setTasks(data.data)
            }
            catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

  return (
    <div className='h-screen w-[100%] bg-slate-500 flex'>
        <div className="w-[20%] bg-white p-2">
            <h1 className='text-blue-800 font-bold text-2xl'>Task Management App</h1>
        </div>
        <div className="w-[80%] flex flex-col gap-5 p-5 overflow-y-auto">
            {tasks.map((t) => (
                <div className='w-[100%] bg-white rounded-md py-3 px-5 flex items-center justify-between'>
                    <div>
                        <div className="text-3xl font-semibold">{t.title}</div>
                        <div className="text-md">{t.desc}</div>
                    </div>
                    <div className="flex gap-8 items-center">
                        <MdModeEditOutline className='text-xl text-blue-500 cursor-pointer hover:text-2xl hover:text-blue-700' onClick={() => setOpenForm(true)}/>
                        <FaTrash className='text-xl text-red-500 cursor-pointer hover:text-2xl hover:text-red-700'/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TaskList
