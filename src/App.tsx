import { useEffect, useRef, useState } from 'react'
import type { TaskList } from './types/tasks'
function App() {
  const [tasks, setTasks] = useState<TaskList[]>(() => {
    const savedTasks = localStorage.getItem('Tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  }) // hadle tasks Array
  const taskRef = useRef<HTMLInputElement>(null) // for each task input

  const handleAddTask = () => {
    const taskTitle = taskRef.current?.value
    if (taskTitle) {
      const newTask: TaskList = {
        title: taskTitle,
        id: Date.now(),
        completed: false,
      }
      setTasks(prev => [...prev, newTask])
      if (taskRef.current) {
        taskRef.current.value = ''
      }
      console.log('Task added:', newTask)
    }
  } 

  const handleDeleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
    console.log('Task deleted with ID:', taskId)
  }

  const handleToggleTask = (taskId: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
    console.log('Task toggled with ID:', taskId)
  }

  useEffect(() => {
    console.log('Tasks updated:', tasks)
    localStorage.setItem('Tasks', JSON.stringify(tasks))
    console.log('Tasks saved to localStorage:', tasks)
  }, [tasks]) //to save tasks to localStorage whenever tasks state changes

  useEffect(() => {
    if (taskRef.current) {
      taskRef.current.focus()
    }
  }, []) // foucus when start

  

  return (
    <>
    <div style={{ padding: '20px' ,alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500" ref={taskRef} type="text" placeholder='Enter a task' style={{padding: '10px', margin: '10px 0', border: '1px solid #130101', borderRadius: '4px'}} />
      <button className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={handleAddTask} onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}>
        +
      </button>
      <div>
        {tasks.map(task => (
          <div key={task.id} className="flex items-center space-x-2 mt-2">
            <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)}></input>
              <div className="flex items-center space-x-2 border border-gray-300 rounded-md py-2 px-4">
                <span className={`${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                <button className="text-xs hover:bg-gray-100" onClick={() => handleDeleteTask(task.id)}>❌</button>
              </div>
          </div>
        ))}
      </div>
      <div className='padding 5px'>Tasks Completed: {tasks.filter(t => t.completed).length}</div>
    </div>
    </>
  )
}

export default App
