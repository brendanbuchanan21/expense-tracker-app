import './signup.css'
import { useState } from 'react';


const SignUpComponent = () => {

    //use state 
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
       <section>
        <div className='welcome-div'>
            <h1>Welcome !</h1>
        </div>

        <div className='form-section'>
        <div className='form-card'>
            <form action="">
                <h3>Sign Up</h3>
                <input type="text" value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" value={confirmPassword} placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button>SIGN UP</button>
            </form>
            <div className='already-have-account-div'>
                <p>Already have an account? <span className='span-sign-in'>Sign in</span></p>
            </div>
        </div>
        </div>

       </section>
    )
}

export default SignUpComponent;