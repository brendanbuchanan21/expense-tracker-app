import addMarker from '../../images/greyAddMarker.svg'
import './individualAccount.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import AddTransactionComponent from './addTransaction';
import TransactionCard from './transactionCard';
import { useGetAllTransactionsQuery } from '../../redux/apis/transactionsApi';
import { ImSpinner6 } from 'react-icons/im';
import { useGetAllAccountsApiQuery } from '../../redux/apis/accountApi';



const AccountComponent = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

  const [addTransaction, setAddTransaction] = useState(false);
  const accountId = id ? parseInt(id) : undefined;

  const { data: accounts, isLoading: accountsLoading } = useGetAllAccountsApiQuery();
  const { data: transactions, refetch, isLoading: transactionsLoading } = useGetAllTransactionsQuery(id, {
    skip: !id,
  });

  if (!id || !accountId) return <p>Account not found</p>;
  if (accountsLoading) return <div>Loading accounts...</div>;

  const account = accounts?.find((acc: any) => acc.id === accountId);
  if (!account) return <p>Account not found in fetched data</p>;


  const closeAccount = () => {
    navigate('/dashboard')
  }


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
        <h3>{account.typeOfAccount === 'Loans' ? `-$${account.balance}` : `$${account.balance}`}</h3>
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
            {transactionsLoading && (
                <div>
                    <ImSpinner6 className='transaction-spinner'/>
                </div>
            )}
            <TransactionCard transactions={transactions || []} />
           
        </div>
        </>
            )}
            </div>
       

        </section>

    )
}

export default AccountComponent;