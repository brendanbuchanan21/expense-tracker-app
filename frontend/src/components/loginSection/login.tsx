import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginComponent = () => {

const navigate = useNavigate();

const [username, setUsername] = useState('');
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
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password"/>
                <button type="submit">Login</button>
                </form>
                <div className='already-have-account-div'>
                    <p>Don't have an account? <span className='span-sign-in' onClick={() => navigate('/welcome')}>Sign Up</span></p>
                </div>
                </div>

               
                
            </div>
        </section>
    )
}
export default LoginComponent;


