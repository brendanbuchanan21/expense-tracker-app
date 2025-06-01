import { FaCoffee } from "react-icons/fa"
import React from "react"
import './individualAccount.css'
import { Transaction } from "../../redux/accountSlice"


interface TransactionCardProps {
    transactions: Transaction[];
    activeTab?: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transactions, activeTab }) => {


    return (
        <>
         {activeTab === 'Spending' ? (
            transactions.map((transaction) => (
                <div className='transaction-card' key={transaction.id}>
                <div className='transaction-img-div'>
                <FaCoffee  className="icon"/>
                </div>
        
                <div className='transaction-text-div'>
                <p>{transaction.description}</p>
                <p className='date-text'>{transaction.date}</p>
               </div>
        
                <div className='transaction-amount-div'>
                <p className="transaction-amount">{transaction.type === "Deposit" ? `+${transaction.amount}` : `-${transaction.amount}`}</p>
                </div>
                </div>
            ))
           
        ) : (
            transactions.map((transaction) => (
                <div className='transaction-card' key={transaction.id}>
            <div className='transaction-img-div'>
            <FaCoffee  className="icon"/>
            </div>
    
            <div className='transaction-text-div'>
            <p>{transaction.description}</p>
            <p className='date-text'>{transaction.date}</p>
           </div>
    
            <div className='transaction-amount-div'>
            <p className="transaction-amount">{transaction.type === "Deposit" ? `+${transaction.amount}` : `-${transaction.amount}`}</p>
            </div>
            </div>
            ))
        )}
        
        
        
        </>
    )
}
export default TransactionCard;

{/*
    {activeTab === 'Spending' ? (
            transactions.map((transaction) => (
                <div className='transaction-card' key={transaction.id}>
                <div className='transaction-img-div'>
                <FaCoffee  className="icon"/>
                </div>
        
                <div className='transaction-text-div'>
                <p>{transaction.description}</p>
                <p className='date-text'>{transaction.date}</p>
               </div>
        
                <div className='transaction-amount-div'>
                <p className="transaction-amount">{transaction.type === "Deposit" ? `+${transaction.amount}` : `-${transaction.amount}`}</p>
                </div>
                </div>
            ))
           
        ) : (
            transactions.map((transaction) => (
                <div className='transaction-card' key={transaction.id}>
            <div className='transaction-img-div'>
            <FaCoffee  className="icon"/>
            </div>
    
            <div className='transaction-text-div'>
            <p>{transaction.description}</p>
            <p className='date-text'>{transaction.date}</p>
           </div>
    
            <div className='transaction-amount-div'>
            <p className="transaction-amount">{transaction.type === "Deposit" ? `+${transaction.amount}` : `-${transaction.amount}`}</p>
            </div>
            </div>
            ))
        )}
           
    */}