import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

const CheckingComponent = () => {

  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const [activeChecking, setActiveChecking] = useState(false)


    //checking account info
  const checkingAccounts = accounts.filter((account) => account.typeOfAccount === "Checking");
  const checkingAmountTotal = checkingAccounts.reduce((accumulator, current) => {
    return accumulator + Number(current.balance);
  }, 0);

  const formattedCheckingAccountTotal = checkingAmountTotal.toFixed(2);
  


        return (
            <>
            <div className={activeChecking ? 'active-account-section-div' : 'account-section-div'} onClick={() => setActiveChecking(prev => !prev)}>
            <div className='account-type-div'>
            <IoIosArrowDown className={activeChecking ? 'arrow-rotate' : 'arrow'}/>
            <p>Checking & Cash</p>
            </div>
            <div className='money-div'>
            <p>${formattedCheckingAccountTotal}</p>
            </div>

            </div>
            
                {activeChecking && (
                checkingAccounts.map((account, index) => (
                <div className='individual-account-balance-page-div' key={index}>
                <div className='individual-account-balance-page-description-div'>
                <p>{account.accountName}</p>
                <p className='bank-name-text'>{account.bankName}</p>
                </div>
                <div className='individual-account-money-div'>
                <p>${account.balance.toString()}</p>
                </div>
                </div>
                ))
                )}
            </>
        )


}
export default CheckingComponent;