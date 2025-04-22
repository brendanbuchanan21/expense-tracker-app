import './addAccount.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addAccount } from '../../redux/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { usePostAccountApiMutation } from '../../redux/apis/accountApi';

const AddAccount = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.uid);

  //use state
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [startingBalance, setStartingBalance] = useState(0);
  const [typeOfAccount, setTypeOfAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false)

  //api rtk query calls
  const [accountApi] = usePostAccountApiMutation();

  const handleSave = async () => {
    setLoading(true);
    const account = {
        accountName: accountName,
        bankName: bankName,
        balance: startingBalance,
        typeOfAccount: typeOfAccount,
        userId: userId ?? '',
    }
    // need to stop unfilled fields from getting posted
    if (accountName.length === 0 || bankName.length === 0 || startingBalance === 0 || typeOfAccount.length === 0) {
        setMessage(true)
        setLoading(false)
        return;
    }
    
    // send the query to the backend to post the user data 
    try {
        const data = await accountApi(account).unwrap()
        console.log('here is the succesful response from account postage', data)
        dispatch(addAccount(account));
        navigate('/dashboard', { state: { tab: 'Balances' } });
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
   



  }

    return (
        <section id='add-account-section'>
        <div className="add-account-main-container">
            <div className='add-account-header-div'>
                <button id='add-account-cancel-btn' onClick={() => navigate('/dashboard')}>Cancel</button>
                <p>Add account</p>
                <button id='add-account-save-btn' onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>

            <div className='account-name-div'>
            <input type="text" placeholder='Account Name' className='bank-input' onChange={(e) => setAccountName(e.target.value)}/>
            <input type="text" placeholder='Bank Name' className='bank-input' onChange={(e) => setBankName(e.target.value)}/>
            </div>

            <div className='starting-balance-div'>
                <input type="text" disabled placeholder='US DOLLAR($)' className='starting-balance-input'/>
                <input type="number" placeholder='Starting Balance' className='starting-balance-input' onChange={(e) => setStartingBalance(Number(e.target.value))}/>
            </div>

           <div id='space-div'></div>

           <div className='account-assign-div'>
            <label htmlFor='"select-account-type'>Type</label>
            <select name='Type' id='select-account-type' defaultValue="Cash" onChange={(e) => setTypeOfAccount(e.target.value)}>
                <option value="Cash">Cash</option>
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
                <option value="Loans">Loans</option>
            </select>
           </div>
           {message && (
            <div className="error-message">
            <p>Please fill out all fields before saving your account.</p>
          </div>
           )}
        </div>
        </section>
    )
}
export default AddAccount;