import React from 'react'

const TaskDelete = ({id, handleExit}) => {

    const deleteTask = async () => {
        try {
            const res = await fetch(`http://localhost:3200/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
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
        <div className="bg-white py-2 px-3 rounded-lg shadow-md flex flex-col gap-5 items-center justify-center w-[50%]">
            <h2 className='font-semibold text-lg'>Are you sure want to delete this task?</h2>
            <div className="flex justify-between gap-5">
                <button className='bg-blue-500 text-white font-semibold py-1 px-2 rounded-md hover:scale-105 hover:bg-blue-600 cursor-pointer' onClick={deleteTask}>Yes</button>
                <button className='bg-red-500 text-white font-semibold py-1 px-2 rounded-md hover:scale-105 hover:bg-red-600 cursor-pointer' onClick={handleExit}>No</button>
            </div>
        </div>
    </div>
  )
}

export default TaskDelete
