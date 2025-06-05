import { useState } from 'react'
import Layout from './components/layout/layout'
import './App.css'
import './index.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout />
    </>
  )
}

export default App
