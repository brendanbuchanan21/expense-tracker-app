import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import './signup.css'
import { useState } from 'react';
import { auth } from './firebase.tsx';
import { useNavigate } from 'react-router-dom';


const SignUpComponent = () => {

    //use state 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


const handleSubmitForm = async (e: any) => {
  e.preventDefault();


  const passwordRegex = /^(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;

  if(password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (!passwordRegex.test(password)) {
    setError("Password must be at least 6 characters long, contain at least one uppercase letter, and have no spaces.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username
    })
    await sendEmailVerification(user, {
        url: "http://localhost:5173/verified-redirect",
    });
    navigate('/check-your-email');
  } catch (error) {
    setError("Signup failed. Please check your credentials.");
    console.error(error);
  }
  
}


    return (
       <section>
        <div className='welcome-div'>
            <h1>Welcome !</h1>
        </div>

        <div className='form-section'>
        <div className='form-card'>
            <form action="" onSubmit={handleSubmitForm}>
                <h3>Sign Up</h3>
                <input type="text" value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" value={confirmPassword} placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type='submit'>SIGN UP</button>
            </form>
            <div className='already-have-account-div'>
                <p>Already have an account? <span className='span-sign-in'>Sign in</span></p>
            </div>
            {error && (
                <div className='error-message-div'>
                 <p>{error}</p>
                </div>
                
            )}
        </div>
        </div>

       </section>
    )
}

export default SignUpComponent;