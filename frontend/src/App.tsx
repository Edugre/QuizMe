import { useState } from 'react';
import { QuizInput } from './pages/QuizInput';
import './App.css';
import './index.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuizInput />    
    </>
  )
}

export default App
