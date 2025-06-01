import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import AccountComponent from "./individualAccount";
import { Account } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";

const LoansComponent = () => {

    const accounts = useSelector((state: RootState) => state.accounts.accounts)
    //loans account info  
    const loanAccounts = accounts.filter((account) => account.typeOfAccount === "Loans");
    const loanAccountsTotal = loanAccounts.reduce((accumulator, current) => {
      return accumulator + Number(current.balance);
    }, 0)
    // give decimal for account total 
     const formattedLoansAccountTotal = loanAccountsTotal.toFixed(2);
     // use state
    const [activeLoans, setActiveLoans] = useState(false);
    const navigate = useNavigate();



    const handleAccountClick = (account: Account) => {
    navigate(`/individual-account/${account.id}`);
  }

    return (
        <>
  <div className='account-section-div' onClick={() => setActiveLoans(prev => !prev)}>
     <div className='account-type-div'>
     <IoIosArrowDown  className={activeLoans ? 'arrow-rotate' : 'arrow'}/>
        <p>Loans</p>
     </div>
        <div className='money-div'>
            <p>-${formattedLoansAccountTotal}</p>
        </div>
                </div>
                {activeLoans && (
                    loanAccounts.length > 0 ? (
                       loanAccounts.map((account) => (
                        <div className='individual-account-balance-page-div' key={account.id} onClick={() => {
                            handleAccountClick(account)
                            }}>
                        <div className='individual-account-balance-page-description-div'>
                            <p>{account.accountName}</p>
                            <p className='bank-name-text'>{account.bankName}</p>
                        </div>
                        <div className='individual-account-money-div'>
                            <p>${account.balance.toString()}</p>
                        </div>
                    </div>
                       ))
                    ) : (
                        <>
                        <div className='individual-account-balance-page-div'><p className='account-no-activity-text'>No activity yet</p></div>
                        </>
                    )
                )} 
        </>
    )
}
export default LoansComponent;