import PictureComponent from './components/loginSection/picture'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IntroComponent from './components/loginSection/intro'
import SignUpComponent from './components/loginSection/signup'
import CheckEmailComponent from './components/loginSection/checkEmail'
import VerifiedRedirect from './components/loginSection/verifiedRedirect'
import LoginComponent from './components/loginSection/login'

 
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<IntroComponent />}/>
        <Route path='/welcome' element={<SignUpComponent />} />
        <Route path='/picture' element={<PictureComponent />} />
        <Route path='/check-your-email' element={<CheckEmailComponent />} />
        <Route path='/verified-redirect' element={<VerifiedRedirect />} /> 
        <Route path='/login' element={<LoginComponent />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
