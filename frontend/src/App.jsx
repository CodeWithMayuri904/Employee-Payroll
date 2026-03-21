import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import EmployeeList from './EmployeeList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmployeeList/>
    </>
  )
}

export default App
