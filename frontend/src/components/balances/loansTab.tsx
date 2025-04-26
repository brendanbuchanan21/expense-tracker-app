import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import AccountComponent from "./individualAccount";
import { Account } from "../../redux/accountSlice";

const LoansComponent = () => {

    const accounts = useSelector((state: RootState) => state.accounts.accounts)

    //loans account info  
    const loanAccounts = accounts.filter((account) => account.typeOfAccount === "Loans");
    const loanAccountsTotal = loanAccounts.reduce((accumulator, current) => {
      return accumulator + Number(current.balance);
    }, 0)
    const formattedLoansAccountTotal = loanAccountsTotal.toFixed(2);
  
     // use state
    const [activeLoans, setActiveLoans] = useState(false);
    const [individualAccountPopUp, setIndividualAccountPopUp] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    // onclick, set pop up true,
    // conditionally render the pop up
    // pass individual account data into the pop up, obviously 

    return (
        <>
  <div className='account-section-div' onClick={() => setActiveLoans(prev => !prev)}>
     <div className='account-type-div'>
     <IoIosArrowDown  className={activeLoans ? 'arrow-rotate' : 'arrow'}/>
        <p>Loans</p>
     </div>
        <div className='money-div'>
            <p>{loanAccountsTotal > 0 ? loanAccountsTotal : ""}</p>
        </div>
                </div>
                {activeLoans && (
                    loanAccounts.length > 0 ? (
                       loanAccounts.map((account) => (
                        <div className='individual-account-balance-page-div' key={account.id} onClick={() => {
                            setIndividualAccountPopUp(true); setSelectedAccount(account); 
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

                {individualAccountPopUp && selectedAccount && (
                    <AccountComponent onClose={() => setIndividualAccountPopUp(false)}
                    account={selectedAccount}
                    />
                )}       
        </>
    )
}
export default LoansComponent;