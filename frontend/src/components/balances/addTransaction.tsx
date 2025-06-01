import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import CategoryComponent from "./categoryItem";
import { useDispatch } from "react-redux";
import { useAddTransactionApiMutation } from "../../redux/apis/transactionsApi";
import { addTransaction } from "../../redux/accountSlice";

interface AddTransactionComponentProps {
    onClose: (didAddTransaction: boolean) => void;
    accountId: number;
}

const AddTransactionComponent: React.FC<AddTransactionComponentProps> = ({ onClose, accountId }) => {

  const dispatch = useDispatch();
  const [categoryActive, setCategoryActive] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("Deposit");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState(false);

  //api calls
  const [addTransactionApi] = useAddTransactionApiMutation();


  const transaction = {
    description,
    date,
    type,
    amount,
    category,
    account: accountId,
  }

const handleAddTransaction = async () => {
  
if (description.length !== 0 && date.length !== 0 && type.length !== 0 && amount !== 0 && category.length !== 0 && accountId) {

  // ill need to send to server and respond with an ID 
  const data = await addTransactionApi({transaction}).unwrap();
  dispatch(addTransaction({transaction: data, accountId: accountId}));
  onClose(true);
  
} else {
  setError(true)
}

}

  return (
    <div className="add-transaction-balance-container">
        <div className='account-balance-add-header'>
        <button onClick={() => onClose(false)}>Cancel</button>
        <p>Add Transaction</p>
        <button onClick={handleAddTransaction}>Save</button>
        </div>

        <div className="add-transaction-description-container">
          <input type="text" placeholder="Description" className="transaction-input" onChange={(e) => setDescription(e.target.value)}/> 
          <div className="date-container">
            <p>Date</p>
            <input type="date" className="transaction-date-input" onChange={(e) => setDate(e.target.value)}/>
          </div>

          <div className="amount-div">
            <select name="" id="type-of-transaction-select" defaultValue="Deposit" onChange={(e) => setType(e.target.value)} value={type}>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
            </select>
            <input type="number" placeholder="Amount" className="transaction-amount-input" onChange={(e) => {
              const value = e.target.value;
              setAmount(parseFloat(value));
            }}/>
          </div>

          <div className="transaction-space-div"></div>

          <div className={categoryActive ? "category-container-active" : "category-container"} onClick={() => setCategoryActive(!categoryActive)} >
             <div className="category-text-container"><p>Category</p></div>
             <div className="select-category-container"><p>Select Category</p><IoIosArrowDown className={categoryActive ? 'activeCategoryArrow' : 'notActiveCategoryArrow'}/></div>
          </div>
        </div>

        {categoryActive && (

          <div className={categoryActive ? "category-slide-container open" : "category-slide-container closed"}>
          <CategoryComponent setCategory={setCategory}/>
          </div>
        )}

        {error && (
          <div className="error-div-transaction">
            <p>Fill out all fields before saving</p>
          </div>
        )}
        
    </div>
)
}
export default AddTransactionComponent;