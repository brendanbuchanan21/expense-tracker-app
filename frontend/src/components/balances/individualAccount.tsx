import addMarker from '../../images/greyAddMarker.svg'
import './individualAccount.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import AddTransactionComponent from './addTransaction';
import TransactionCard from './transactionCard';
import { useGetAllTransactionsQuery } from '../../redux/apis/transactionsApi';
import { ImSpinner6 } from 'react-icons/im';

const AccountComponent = () => {

    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>Account not found!</div>
    }
    const accountId = parseInt(id);
    const account = useSelector((state: RootState) => state.accounts.accounts.find((account) => account.id === accountId));
    console.log(account);
    if (!account) {
        return <div>Account not found!</div>
    }

    const navigate = useNavigate();

    const { data, error, refetch, isLoading } = useGetAllTransactionsQuery(id)
    console.log(data, 'here is the transaction response');



    const closeAccount = () => {
        navigate('/dashboard')
    }

    //use state
    const [addTransaction, setAddTransaction] = useState(false);

    return (
        <section className='individual-account-section'>
            <div className='main-container-individual-account'>
            {addTransaction ? (
                <AddTransactionComponent onClose={(didAddTransaction) => {
                    setAddTransaction(false)
                    if (didAddTransaction) {
                        refetch()
                    }
                }} accountId={accountId}/>
            ) : (
                <>
                <button id='individual-account-close-btn' onClick={closeAccount}>Close</button>
        <div className="account-balance-header-div">
        <h3>{account.balance}</h3>
        <p>{account.accountName}</p>
        </div>


        <div className="filter-div">
            <button>Last 30 Days</button>
            <button>Filters</button>
            <button>Sort</button>
        </div>

        <div className="add-transaction-div" onClick={() => setAddTransaction(true)}>
        <div className="add-transaction-inner-div">
        <img src={addMarker} alt="" />
        <p>Add a Transaction</p>
        </div>
        </div>

        <div className='transaction-section'>
            {isLoading && (
                <div>
                    <ImSpinner6 className='transaction-spinner'/>
                </div>
            )}
            <TransactionCard transactions={data || []} />
           
        </div>
        </>
            )}
            </div>
       

        </section>

    )
}

export default AccountComponent;