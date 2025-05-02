import { FaCoffee } from "react-icons/fa"
import { Account } from "../../redux/accountSlice"
import React from "react"
import './individualAccount.css'


interface TransactionCardProps {
    account: Account
}

const TransactionCard: React.FC<TransactionCardProps> = ({account}) => {

  const transactions = account.transactions;

    return (
        <>
        {transactions?.map((transaction) => (
            <div className='transaction-card' key={transaction.id}>
            <div className='transaction-img-div'>
            <FaCoffee  className="icon"/>
            </div>
    
            <div className='transaction-text-div'>
            <p>{transaction.description}</p>
            <p className='date-text'>{transaction.date}</p>
           </div>
    
            <div className='transaction-amount-div'>
            <p>{transaction.amount}</p>
            </div>
            </div>
        ))}
        
        
        </>
    )
}
export default TransactionCard;