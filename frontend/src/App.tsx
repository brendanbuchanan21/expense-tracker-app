
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IntroComponent from './components/loginSection/intro'
import SignUpComponent from './components/loginSection/signup'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<IntroComponent />}/>
        <Route path='/welcome' element={<SignUpComponent />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
