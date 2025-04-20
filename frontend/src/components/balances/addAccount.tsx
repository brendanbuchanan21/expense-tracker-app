import './addAccount.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addAccount } from '../../redux/accountSlice';
import { useDispatch } from 'react-redux';

const AddAccount = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //use state
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [startingBalance, setStartingBalance] = useState(0);
  const [typeOfAccount, setTypeOfAccount] = useState('');

  const handleSave = async () => {
    const account = {
        accountName: accountName,
        bankName: bankName,
        balance: startingBalance,
        typeOfAccount: typeOfAccount
    }

    dispatch(addAccount(account));


  }

    return (
        <section id='add-account-section'>
        <div className="add-account-main-container">
            <div className='add-account-header-div'>
                <button id='add-account-cancel-btn' onClick={() => navigate('/dashboard')}>Cancel</button>
                <p>Add account</p>
                <button id='add-account-save-btn' onClick={handleSave}>Save</button>
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
        </div>
        </section>
    )
}
export default AddAccount;