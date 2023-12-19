import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { MdModeEditOutline } from 'react-icons/md'
import { Spinner } from '@fluentui/react'
import { FaPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import TaskEdit from './TaskEdit'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [openForm, setOpenForm] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null) 

  const fetchMoreData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3200/tasks?page=${page}`, {
        method: 'GET',
      })
      const data = await res.json()
      setTasks((prevTasks) => [...prevTasks, ...data.data])
      setPage((prevPage) => prevPage + 1)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true)
      setTimeout(async () => {
        await fetchMoreData()
        setLoading(false)
      }, 2000)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3200/tasks', {
          method: 'GET',
        })
        const data = await res.json()
        setTasks(data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [openForm])

  const handleEdit = (taskId) => {
    setSelectedTaskId(taskId) 
    setOpenForm(true)
  }

  const handleExit = () => {
    setOpenForm(false)
  }

  return (
    <div className='h-screen w-[100%] bg-white flex relative'>
      <div className='w-[20%] bg-blue-500 p-2 flex flex-col'>
        <h2 className='text-white font-semibold text-lg'>Welcome to</h2>
        <h1 className='text-orange-400 font-bold text-3xl'>taskpedia</h1>
      </div>
      {openForm && <TaskEdit id={selectedTaskId} handleExit={handleExit}/>} {/* Pass the selected task ID to TaskEdit */}
      <div
        className={`w-[80%] flex flex-col gap-5 p-5 overflow-y-auto ${openForm ? 'z-0' : 'z-10'}`}
        onScroll={handleScroll}
        style={{ maxHeight: '100vh' }}
      >
        {tasks.map((t, index) => (
          <div
            key={index}
            className='w-[100%] bg-white rounded-md py-3 px-5 flex items-center justify-between shadow-lg hover:cursor-pointer hover:bg-slate-50'
          >
            <div>
              <div className='text-3xl font-semibold'>{t.title}</div>
              <div className='text-md'>{t.desc}</div>
            </div>
            <div className='flex gap-8 items-center'>
              <MdModeEditOutline
                className='text-xl text-blue-500 cursor-pointer hover:text-2xl hover:text-blue-700'
                onClick={() => handleEdit(t.id)} 
              />
              <FaTrash
                className='text-xl text-red-500 cursor-pointer hover:text-2xl hover:text-red-700'
              />
            </div>
          </div>
        ))}
        {loading && <Spinner label='Loading...' appearance='inverted' styles={{ label: { color: 'blue' } }} />}
      </div>
      <div className='fixed bottom-5 right-5 bg-blue-600 p-2 cursor-pointer rounded-md hover:scale-110 hover:bg-blue-500 z-10'>
        <Link to={'/form'}>
          <FaPlusSquare className='text-white text-3xl' />
        </Link>
      </div>
    </div>
  )
}

export default TaskList
