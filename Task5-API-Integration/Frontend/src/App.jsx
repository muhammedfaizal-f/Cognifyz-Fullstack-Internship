import { useState } from 'react'
import Navbar from './components/Navbar'
import TaskBoard from './components/TaskBoard'
import ToastStack from './components/Toast'
import './App.css'

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking')
  const [triggerAdd, setTriggerAdd] = useState(0)

  return (
    <>
      <Navbar
        apiStatus={apiStatus}
        onAddTask={() => setTriggerAdd(n => n + 1)}
      />
      <TaskBoard
        onApiStatus={setApiStatus}
        triggerAdd={triggerAdd}
      />
      <ToastStack />
    </>
  )
}