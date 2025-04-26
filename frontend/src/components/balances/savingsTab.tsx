
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Account } from "../../redux/accountSlice";
import AccountComponent from "./individualAccount";

const SavingsComponent = () => {

    const accounts = useSelector((state: RootState) => state.accounts.accounts)
    const savingsAccounts = accounts.filter((account) => account.typeOfAccount === "Savings");
    const savingsAccountsTotal = savingsAccounts.reduce((accumulator, current) => {
      return accumulator + Number(current.balance);
    }, 0);
    const formattedSavingsAccountTotal = savingsAccountsTotal.toFixed(2);


    //use state
    const [activeSavings, setActiveSavings] = useState(false)
    const [individualAccountPopUp, setIndividualAccountPopUp] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    
    return (
    <>
    <div className={activeSavings ? 'active-account-section-div' : 'account-section-div'} onClick={() => setActiveSavings(prev => !prev)}>
        <div className='account-type-div'>
        <IoIosArrowDown className={activeSavings ? 'arrow-rotate' : 'arrow'}/>
        <p>Savings</p>
        </div>
            <div className='money-div'>
            <p>${formattedSavingsAccountTotal}</p>
            </div>
    </div>
        
        {activeSavings && (
            savingsAccounts.map((account) => (
            <div className='individual-account-balance-page-div' key={account.id} onClick={() => {
                setIndividualAccountPopUp(true);
                setSelectedAccount(account);
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
        )}

                {individualAccountPopUp && selectedAccount && (
                    <AccountComponent onClose={() => setIndividualAccountPopUp(false)}
                    account={selectedAccount}
                    />
                )}    
    </>
    )
}

export default SavingsComponent;