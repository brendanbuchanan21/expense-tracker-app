import './intro.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroComponent = () => {


    let cards = ['Track Expenses', 'See Your Spending Habits', 'Take Control Of Your Finances'];

    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    const handleNextPage = () => {
        navigate('/welcome')
    }


    return (
        <section>
            <div className="intro-div">
                <h1>Unlock Your Financial Clarity</h1>
            </div>
            <div className="card-container">
             <div className="card">
               <p>{cards[currentIndex]}</p>
             </div>
            </div>

            <div className='dot-container'>
                {cards.map((_, index) => (
                    <span 
                    key={index}
                    className={`dot ${currentIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

            <div className='get-started-div'>
                <button onClick={handleNextPage}>Create New Account</button>
            </div>
            <div className='login-text-div'>
                <p>Already have an account? <span className='login-text' onClick={() => navigate('/login')}>Login</span></p>
            </div>
            
        </section>
    )
}

export default IntroComponent;