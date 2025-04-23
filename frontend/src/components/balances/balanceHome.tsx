import '../dashboardSection/dashboard.css'
import './balanceHome.css'
import brendan from '../../images/Me.jpg'
import { IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { useGetAllAccountsApiQuery } from '../../redux/apis/accountApi'
import { addAccount } from '../../redux/accountSlice'
import { Account } from '../../redux/accountSlice'


const BalanceHome = () => {


  const accountsInRedux = useSelector((state: RootState) => state.accounts.accounts)
  const [activeChecking, setActiveChecking] = useState(false);
  const dispatch = useDispatch();

  //rtk queries
  const { data: fetchedAccounts, isLoading, isError } = useGetAllAccountsApiQuery(undefined, {
    skip: accountsInRedux.length > 0
  })

  //useeffect
  useEffect(() => {
    if (fetchedAccounts.length > 0) {
        fetchedAccounts.forEach((account: Account) => {
            dispatch(addAccount(account))
        });
    }
    
  }, [fetchedAccounts, dispatch])
  
 
    return (
        <>
        <div className='display-container'>
        {isLoading && <p>Loading accounts...</p>}
        {isError && <p>Had trouble fetching your accounts. Try refreshing the page.</p>}

        <div className='balance-header-main-div'>
        <div className='header-img-div'>
        <img src={brendan} alt="sex-panther"  className='profile-pic'/>
        </div>

        <div className='balance-header-money-div'>
            <p id='all-text'>All</p>
            <p>$190</p>
        </div>
        </div>


        <div className='balance-account-section'>

        <div className={activeChecking ? 'active-account-section-div' : 'account-section-div'} onClick={() => setActiveChecking(prev => !prev)}>
            <div className='account-type-div'>
                <IoIosArrowDown className={activeChecking ? 'arrow-rotate' : 'arrow'}/>
                <p>Cash & Checking</p>
            </div>
            <div className='money-div'>
                <p>$190.00</p>
            </div>
        </div>
        {activeChecking && (
                <div className='individual-account-balance-page-div'>
                    <div className='individual-account-balance-page-description-div'>
                        <p>Brendan's Checking Account</p>
                        <p className='bank-name-text'>Wells Fargo</p>
                    </div>
                    <div className='individual-account-money-div'>
                        <p>$190</p>
                    </div>
                </div>
            )}

        <div className='account-section-div'>
            <div className='account-type-div'>
                <IoIosArrowDown />
                <p>Savings</p>
            </div>
            <div className='money-div'>
                <p>$190.00</p>
            </div>
        </div>

        <div className='account-section-div'>
            <div className='account-type-div'>
                <IoIosArrowDown />
                <p>Loans</p>
            </div>
            <div className='money-div'>
                <p>$190.00</p>
            </div>
        </div>

        </div>




        </div>
        </>
    )

}
    
export default BalanceHome;