import '../dashboardSection/dashboard.css'
import './balanceHome.css'
import brendan from '../../images/Me.jpg'
import { IoIosArrowDown } from 'react-icons/io'

const BalanceHome = () => {

 
    return (
        <>
        <div className='display-container'>


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

        <div className='account-section-div'>
            <div className='account-type-div'>
                <IoIosArrowDown />
                <p>Cash & Checking</p>
            </div>
            <div className='money-div'>
                <p>$190.00</p>
            </div>
        </div>

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