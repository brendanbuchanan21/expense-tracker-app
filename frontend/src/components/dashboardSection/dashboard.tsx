import './dashboard.css'
import { useState } from "react"
import Navbar from './navbar';
import BalanceHome from '../balances/balanceHome';

const Dashboard = () => {

const [tabSelected, setTabSelected] = useState("Activity");

    return (
       <section className="home-section">
        <div className='main-container'>

        <div className="dashboard-header-div">
            <h3>{tabSelected}</h3>
        </div>

        <div className='activity-container'>
            <p>get started to see your activity</p>
        </div>
        <Navbar tabSelected={tabSelected} setTabSelected={setTabSelected}/>

        </div>
        
        
        
        </section>
    )
}

export default Dashboard