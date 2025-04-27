import React from "react";


interface AddTransactionComponentProps {
    onClose: () => void;
}

const AddTransactionComponent: React.FC<AddTransactionComponentProps> = ({ onClose}) => {


    return (
        <div className="add-transaction-balance-container">
            <div className='account-balance-add-header'>
            <button onClick={onClose}>Cancel</button>
            <p>Add Transaction</p>
            <button>Save</button>
            </div>

            <div className="add-transaction-description-container">
              <input type="text" placeholder="Description" className="transaction-input"/> 
              <div className="date-container">
                <p>Date</p>
                <input type="date" className="transaction-date-input"/>
              </div>

              <div className="amount-div">
                <select name="" id="type-of-transaction-select" defaultValue="Deposit">
                    <option value="Deposit">Deposit</option>
                    <option value="Withdrawal">WithDrawal</option>
                </select>
                <input type="text" placeholder="Amount" className="transaction-amount-input"/>
              </div>

              <div className="transaction-space-div"></div>

              <div>
                <select name="" id="">
                    <option value=""></option>
                </select>
              </div>
            </div>
        </div>
    )
}
export default AddTransactionComponent;