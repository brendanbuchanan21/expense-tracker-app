import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import CategoryComponent from "./categoryItem";

interface AddTransactionComponentProps {
    onClose: () => void;
}

const AddTransactionComponent: React.FC<AddTransactionComponentProps> = ({ onClose}) => {

  const [categoryActive, setCategoryActive] = useState(false);


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

          <div className={categoryActive ? "category-container-active" : "category-container"} onClick={() => setCategoryActive(!categoryActive)} >
             <div className="category-text-container"><p>Category</p></div>
             <div className="select-category-container"><p>Select Category</p><IoIosArrowDown className={categoryActive ? 'activeCategoryArrow' : 'notActiveCategoryArrow'}/></div>
          </div>
        </div>

        {categoryActive && (

          <div className={categoryActive ? "category-slide-container open" : "category-slide-container closed"}>
          <CategoryComponent />
          </div>
        )}
        
    </div>
)
}
export default AddTransactionComponent;