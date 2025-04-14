import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterFace from './components/RegisterFace'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-red-500 p-4'>helo ooo</h1>
<RegisterFace/>
    </>
  )
}

export default App
