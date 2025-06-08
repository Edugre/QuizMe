import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { QuizInput } from './pages/QuizInput';
import { Quiz } from './pages/Quiz';
import './App.css';
import './index.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/quiz-input' element={<QuizInput />}/>
        <Route path='/quiz' element={<Quiz />}/>
      </Routes>
    </Router>
  )
}

export default App
