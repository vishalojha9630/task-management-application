import React, { useEffect, useState } from 'react'

import './App.css';
import Footer from './components/footer';
import Header from './components/header';


function App() {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [editTaskId, setEditTaskId] = useState(null)
  const [editTaskText, setEditTaskText] = useState("")

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    if (savedTasks?.length > 0) {
      setTasks(savedTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if (!newTask?.trim()) return;
    setTasks([...tasks, {id: Date.now(), text: newTask, completed: false}]);
    setNewTask("")
  }

  const handleCompleteTask = (id) => {
    setTasks(
      tasks?.map((task) => task?.id === id ? {...task, completed: !task?.completed}: task)
    )
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks?.filter((task) => task?.id !== id))
  }

  const handleEditTask = (item) => {
    setEditTaskId(item?.id)
    setEditTaskText(item?.text)
  }

  const handleSaveTask = (id) => {
    setTasks(
      tasks?.map((task) => task?.id === id ? {...task, text: editTaskText}: task)
    )

    setEditTaskId(null)
    setEditTaskText("")
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
     <Header />

    <main className='flex-grow-1 container py-4'>
      <div className='mb-3'>
        <div className='input-group'>
        <input
        type='text'
        value={newTask}
        className='form-control'
        placeholder='Enter a new task'
        onChange={(e) => setNewTask(e?.target?.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        />

        <button className="btn btn-primary" onClick={() => handleAddTask()}>
          Add Task
        </button>
        </div>
      </div>

      <ul className='list-group'>
        {tasks.map((item, i) => {
            return (
            <li key={i} className={`list-group-item d-flex justify-content-between align-items-center`}>

              {editTaskId === item?.id ? 
                (<div className=''>
                  <div className='input-group'>
                    <input
                      type='text'
                      value={editTaskText}
                      className='form-control'
                      onChange={(e) => setEditTaskText(e?.target?.value)}
                    />
          
                    <button className="btn btn-primary" onClick={() => handleSaveTask(item?.id)}>
                      Save
                    </button>
                  </div>
                </div>)
                : 
                (<span style={{textDecoration: item.completed ? "line-through" : "none"}}>
                  {item?.text}
                </span>)
              }

                <div>
                  <button
                    className={`btn btn-sm ${item?.completed ? "btn-warning" : "btn-success"} me-2`}
                    onClick={() => handleCompleteTask(item?.id)}
                  >
                    {item?.completed ? "Undo" : "Completed"}
                  </button>
               
                  <button 
                    className="btn btn-sm btn-danger me-2" 
                    onClick={() => handleDeleteTask(item?.id)}
                  >
                    Delete
                  </button>

                  <button 
                    className="btn btn-sm btn-warning" 
                    onClick={() => handleEditTask(item)}
                  >
                    Edit
                  </button>
                </div>
            </li>
            )
          })}
      </ul>
    </main>
     <Footer />
    </div>
  );
}

export default React.memo(App);
