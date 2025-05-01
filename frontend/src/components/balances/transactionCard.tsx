import { FaCoffee } from "react-icons/fa"
import { Account } from "../../redux/accountSlice"
import React from "react"


interface TransactionCardProps {
    account: Account
}

const TransactionCard: React.FC<TransactionCardProps> = ({account}) => {

  const transactions = account.transactions;

    return (
        <>
     
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
        
        </>
    )
}
export default TransactionCard;