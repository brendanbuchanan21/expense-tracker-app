import { useState } from 'react';
import './settings-page.css'
import { signOut } from 'firebase/auth';
import { auth } from '../loginSection/firebase';
import { useNavigate } from 'react-router-dom';
import { useResetUserDataMutation } from '../../redux/apis/userDataApi';
import { FaSpinner } from "react-icons/fa";


const SettingsComponent = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [showResetData, setShowResetData] = useState(false);
    const navigate = useNavigate();

    // api call 
    const [resetUserData, {isLoading, isError}] = useResetUserDataMutation();

    const handleSignOut = async () => {
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }

    const handleDeleteAccount = async () => {

    }

    const handleResetAccount = async () => {

      try {
       await resetUserData().unwrap();
       console.log(resetUserData);
       setShowResetData(false);
       navigate('/dashboard');
      } catch (error) {
        console.error('there was an error with your query', error);
      }
    }
    //need to create the query on the front end 
    // have the correct route
    // on the backend, extract the users id
    // find associated tables and delete everything
    // navigate to activity page
    return (
        <div className="settings-main-container">
          {isLoading && (
            <>
            <FaSpinner  className='reset-data-spinner'/>
            </>
          )}
            <p className={showPopup || showResetData ? 'hidden-text' : 'sign-out-text'} onClick={() => setShowResetData(true)}>Reset All Data</p>
            <p className={showPopup || showResetData ? 'hidden-text' : 'sign-out-text'}>Delete Account</p>
            <p className={showPopup || showResetData ? 'hidden-text' : 'sign-out-button'} onClick={() => setShowPopup(true)}>Sign Out</p>

              {showResetData && (
              <div className='reset-data-pop-up-container'>
                <p>Are you sure you want to reset your accounts data? This action cannot be undone</p>
                <div className='sign-out-btns-div'>
                  <button className='cancel-btn' onClick={() => setShowResetData(false)}>Cancel</button>
                  <button className='confirm-sign-out-btn' onClick={() => handleResetAccount()}>Erase Data</button>
                </div>
              </div>
            )}

            {showPopup && (
                <div className='sign-out-pop-up-container'>
                    <p>Are you sure you want to sign out?</p>
                    <div className='sign-out-btns-div'>
                        <button onClick={() => setShowPopup(false)} className='cancel-btn'>Cancel</button>
                        <button className='confirm-sign-out-btn' onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
                
            )}

          
        </div>
      
    )
}

export default SettingsComponent;