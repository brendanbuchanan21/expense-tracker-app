import '../dashboardSection/dashboard.css'
import './balanceHome.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { useGetAllAccountsApiQuery } from '../../redux/apis/accountApi'
import { addAccount } from '../../redux/accountSlice'
import { Account } from '../../redux/accountSlice'
import { FaSpinner } from 'react-icons/fa'
import CheckingComponent from './checkingTab'
import SavingsComponent from './savingsTab'
import LoansComponent from './loansTab.tsx'

const BalanceHome = () => {

  // redux state
  const accountsInRedux = useSelector((state: RootState) => state.accounts.accounts);
  const profilePicture = useSelector((state: RootState) => state.user.profilePictureUrl);
  
  // savings account info
  const accounts = useSelector((state: RootState) => state.accounts.accounts)
  console.log(accounts, 'lol😆');
  const totalmoney = accounts.reduce((accumulator, current) => {
    return accumulator + Number(current.balance)
  },0)
  
  const dispatch = useDispatch();

   //rtk queries
   const { data: fetchedAccounts, isLoading } = useGetAllAccountsApiQuery(undefined, {
    skip: accountsInRedux.length > 0
  })

  useEffect(() => {
    if (fetchedAccounts && fetchedAccounts.length > 0) {
        fetchedAccounts.forEach((account: Account) => {
            dispatch(addAccount(account))
        });
    }
  }, [fetchedAccounts, dispatch])
  
    return (
        <>
        <div className='display-container'>
            {isLoading && (
                <>
                <FaSpinner />
                </>
            )}
            {accountsInRedux.length < 1 ? (
                <>
                <p className='no-accounts-text'>No accounts tracked yet</p>
                </>
            ) : (
                <>
                <div className='balance-header-main-div'>
                <div className='header-img-div'>
                <img src={profilePicture ?? ''} alt="sex-panther"  className='profile-pic'/>
                </div>
        
                <div className='balance-header-money-div'>
                    <p id='all-text'>All</p>
                    <p>{totalmoney}</p>
                </div>
                </div>
                <div className='balance-account-section'>
                <CheckingComponent />
                <SavingsComponent />
                <LoansComponent />
                </div>
                </>
            )}
        </div>
        </>
            )
}
export default BalanceHome;