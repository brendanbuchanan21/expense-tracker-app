import addMarker from '../../images/greyAddMarker.svg'
import { FaCoffee } from 'react-icons/fa';
import './individualAccount.css'

const AccountComponent = () => {

    //if no transactions, then display no recent activity

    return (
        <>
        <div className="account-balance-header-div">
        <h3>${200.00}</h3>
        <p>Brendans checking account</p>
        </div>

        <div className="filter-div">
            <button>Last 30 Days</button>
            <button>Filters</button>
            <button>Sort</button>
        </div>

        <div className="add-transaction-div">
        <div className="add-transaction-inner-div">
        <img src={addMarker} alt="" />
        <p>Add a Transaction</p>
        </div>
        </div>

        <div className='transaction-section'>

            <div className='transaction-card'>
            <div className='transaction-img-div'>
            <FaCoffee />
            </div>

            <div className='transaction-text-div'>
            <p>coffee date</p>
            <p className='date-text'>4/22</p>
           </div>

            <div className='transaction-amount-div'>
            <p>$10.00</p>
            </div>
            </div>
          
        </div>
        </>
    )
}

export default AccountComponent;