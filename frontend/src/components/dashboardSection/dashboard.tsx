import './dashboard.css'
import { useState } from "react"
import Navbar from './navbar';
import BalanceHome from '../balances/balanceHome';
import ExpensesHome from '../expenses/expensesHome';
import { useNavigate } from 'react-router-dom';
import ActivityHome from '../activity/activityHome';
import SettingsComponent from '../settings/settings-page';

const Dashboard = () => {


  const navigate = useNavigate();

//somehow i need to create a function that takes in the tab selected in navbar, and set the tab selected to the selected
// tab, and then i need to set the initial tab value to be the seleceted tab from local storage or activity as
// default

  const handleTabChange = (newTab: string) => {
    setTabSelected(newTab)
    localStorage.setItem('selectedTab', newTab)
  }

  const initialTab = localStorage.getItem('selectedTab') || 'Activity';
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
            <ActivityHome />
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
        {tabSelected === "Settings" && (
          <>
           <div className="dashboard-header-div">
            <h3>{tabSelected}</h3>
             </div>

            <div>
          <SettingsComponent />
            </div>
          
          </>
        )}
        
        <Navbar tabSelected={tabSelected} setTabSelected={handleTabChange}/>

        </div>
        
        
        
        </section>
    )
}

export default Dashboard