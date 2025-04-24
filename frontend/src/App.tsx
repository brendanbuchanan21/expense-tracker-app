import PictureComponent from './components/loginSection/picture'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IntroComponent from './components/loginSection/intro'
import SignUpComponent from './components/loginSection/signup'
import CheckEmailComponent from './components/loginSection/checkEmail'
import VerifiedRedirect from './components/loginSection/verifiedRedirect'
import LoginComponent from './components/loginSection/login'
import Dashboard from './components/dashboardSection/dashboard'
import BalanceHome from './components/balances/balanceHome'
import ExpensesHome from './components/expenses/expensesHome'
import AddAccount from './components/balances/addAccount'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from './components/loginSection/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser, clearUser } from './redux/userSlice'
import ProtectedRoute from './components/protectedRoute'


function App() {

  const dispatch = useDispatch();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({uid: user.uid, username: user.displayName ?? ''}))
    } else {
      dispatch(clearUser())
    }
  });
  
  return () => unsubscribe();

}, [dispatch])
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<IntroComponent />}/>
        <Route path='/welcome' element={<SignUpComponent />} />
        <Route path='/picture' element={<ProtectedRoute><PictureComponent /> </ProtectedRoute>} />
        <Route path='/check-your-email' element={<ProtectedRoute><CheckEmailComponent /></ProtectedRoute>} />
        <Route path='/verified-redirect' element={<ProtectedRoute><VerifiedRedirect /></ProtectedRoute>} /> 
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/expenses-home' element={<ProtectedRoute><ExpensesHome /></ProtectedRoute>} />
        <Route path='/balance-home' element={<ProtectedRoute><BalanceHome /></ProtectedRoute>} />
        <Route path='/add-account' element={<ProtectedRoute><AddAccount /></ProtectedRoute>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
