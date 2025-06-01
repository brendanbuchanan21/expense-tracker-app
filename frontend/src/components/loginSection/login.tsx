import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.ts';

const LoginComponent = () => {

const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setIsLoading] = useState(false);

const handleSubmitForm = async (e: any) => {
  e.preventDefault();

  const passwordRegex = /^(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;


  if (!passwordRegex.test(password)) {
    setError("Password must be at least 6 characters long, contain at least one uppercase letter, and have no spaces.");
    return;
  }


  try {
    setIsLoading(true)
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
    }
    navigate('/dashboard');

  } catch (error) {
    setError("Login failed. Please check your credentials");
    console.error(error)
  } finally {
    setIsLoading(false)
  }
}

    return (
        <section>
            <div className="welcome-div">
                <h1>Welcome back</h1>
            </div>


            <div className="form-section">
                <div className="form-card">
                    <h3 className='sign-in-header-text'>Sign in</h3>
                <form action="" onSubmit={handleSubmitForm}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className='sign-up-btn'>Login</button>
                </form>
                {loading && (
               <div className='spinner-parent'>
               <div className='spinner' />
               </div>
            )}
                <div className='already-have-account-div'>
                    <p>Don't have an account? <span className='span-sign-in' onClick={() => navigate('/welcome')}>Sign Up</span></p>
                </div>
                </div>
                {error && (
                <div className='error-message-div'>
                 <p>{error}</p>
                </div>
                
            )}
               
                
            </div>
        </section>
    )
}
export default LoginComponent;


