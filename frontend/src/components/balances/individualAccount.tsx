import addMarker from '../../images/greyAddMarker.svg'

const AccountComponent = () => {


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
        </>
    )
}

export default AccountComponent;