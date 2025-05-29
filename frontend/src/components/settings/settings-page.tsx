import { useState } from 'react';
import './settings-page.css'
import { signOut, deleteUser } from 'firebase/auth';
import { auth } from '../loginSection/firebase';
import { useNavigate } from 'react-router-dom';
import { useDeleteProfileDataMutation, useResetUserDataMutation } from '../../redux/apis/userDataApi';
import { FaSpinner } from "react-icons/fa";


const SettingsComponent = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [showResetData, setShowResetData] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const navigate = useNavigate();
    

    // api call 
    const [resetUserData, {isLoading: isResetLoading, isError}] = useResetUserDataMutation();
    const [deleteUserData, {isLoading: isDeletingLoading}] = useDeleteProfileDataMutation();

  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        navigate('/login');
        // need to remove the memory of the page we were on
        localStorage.removeItem('selectedTab');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }

    const handleDeleteAccount = async () => {
      try {
         await deleteUserData().unwrap();
        //configure firebase deletion
        const currentUser = auth.currentUser;
        if (currentUser) {
          await deleteUser(currentUser);
        } 
        setShowDeleteAccount(false);
        navigate('/');
        // need to remove the memory of the page we were on
        localStorage.removeItem('selectedTab');
      } catch (error) {
        console.error('could not successfully delete your account')
      }

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
    
    return (
        <div className="settings-main-container">
          {isResetLoading && (
            <>
            <FaSpinner  className='reset-data-spinner'/>
            </>
          )}
          {
            isDeletingLoading && (
            <>
            <FaSpinner  className='reset-data-spinner'/>
            </>
          )
          }
            <p className={showPopup || showResetData || showDeleteAccount ? 'hidden-text' : 'sign-out-text'} onClick={() => setShowResetData(true)}>Reset All Data</p>
            <p className={showPopup || showResetData || showDeleteAccount ?'hidden-text' : 'sign-out-text'} onClick={() => setShowDeleteAccount(true)}>Delete Account</p>
            <p className={showPopup || showResetData || showDeleteAccount ? 'hidden-text' : 'sign-out-button'} onClick={() => setShowPopup(true)}>Sign Out</p>

              {showResetData && (
              <div className='reset-data-pop-up-container'>
                <p>Are you sure you want to reset your accounts data? This action cannot be undone</p>
                <div className='sign-out-btns-div'>
                  <button className='cancel-btn' onClick={() => setShowResetData(false)}>Cancel</button>
                  <button className='confirm-sign-out-btn' onClick={() => handleResetAccount()}>Erase Data</button>
                </div>
              </div>
            )}

            {showDeleteAccount && (
              <div className='reset-data-pop-up-container'>
                <p>Are you sure you want to permanently delete your account? This action cannot be undone</p>
                <div className='sign-out-btns-div'>
                  <button className='cancel-btn' onClick={() => setShowDeleteAccount(false)}>Cancel</button>
                  <button className='confirm-sign-out-btn' onClick={() => handleDeleteAccount()}>Delete Acc</button>
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