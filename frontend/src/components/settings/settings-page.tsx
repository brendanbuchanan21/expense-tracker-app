import { useState } from 'react';
import './settings-page.css'
import { signOut } from 'firebase/auth';
import { auth } from '../loginSection/firebase';
import { useNavigate } from 'react-router-dom';


const SettingsComponent = () => {

    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
    
    return (
        <div className="settings-main-container">
            <p className={showPopup ? 'hidden-text' : 'sign-out-text'}>Reset All Data</p>
            <p className={showPopup ? 'hidden-text' : 'sign-out-text'}>Delete Account</p>
            <p className={showPopup ? 'hidden-text' : 'sign-out-button'} onClick={() => setShowPopup(true)}>Sign Out</p>


            {showPopup && (
                <div className='sign-out-pop-up-container'>
                    <p>Are you sure you want to sign out?</p>
                    <div className='sign-out-btns-div'>
                        <button className='confirm-sign-out-btn' onClick={handleSignOut}>Sign Out</button>
                        <button onClick={() => setShowPopup(false)} className='cancel-btn'>Cancel</button>
                    </div>
                </div>
                
            )}
        </div>
      
    )
}

export default SettingsComponent;