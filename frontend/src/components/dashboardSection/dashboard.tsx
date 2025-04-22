import './dashboard.css'
import { useState } from "react"
import Navbar from './navbar';
import BalanceHome from '../balances/balanceHome';
import ExpensesHome from '../expenses/expensesHome';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {


const navigate = useNavigate();
const location = useLocation();


const initialTab = location.state?.tab || "Activity";
const [tabSelected, setTabSelected] = useState(initialTab);


    return (
       <section className="home-section">
        <div className='main-container'>

        

        {tabSelected === "Activity" && (
            <>
            <div className="dashboard-header-div">
            <h3>{tabSelected}</h3>
             </div>
            <div className='display-container'>
            <p>get started to see your activity</p>
           </div>
            </>
        )}

        {tabSelected === "Balances" && (
            <>
            <div className="dashboard-header-div">
            <h3>{tabSelected}</h3>
            <button className='balance-header-add-btn' onClick={() => navigate('/add-account')}>Add</button>
             </div>

             <div>
                <BalanceHome />
             </div>
            </>
        )}

        {tabSelected === "Expenses" && (
            <>
           <div className="dashboard-header-div">
            <h3>{tabSelected}</h3>
             </div>

            <div>
                <ExpensesHome />
            </div>
            </>
        )}
        
        <Navbar tabSelected={tabSelected} setTabSelected={setTabSelected}/>

        </div>
        
        
        
        </section>
    )
}

export default Dashboard