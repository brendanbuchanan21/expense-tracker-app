import './dashboard.css'
import React from 'react';
import './dashboard.css'
import { IoSettingsOutline} from "react-icons/io5"

interface NavBarProps {
    tabSelected: string,
    setTabSelected: (tab: string) => void;
}

const Navbar: React.FC<NavBarProps> = ( { tabSelected, setTabSelected } ) => {

    return (
        <div className='navbar-container'>
        <p className={tabSelected === "Activity" ? "active" : "navbar-title"} onClick={() => setTabSelected("Activity")}>Activty</p>
        <p onClick={() => setTabSelected("Balances")} className={tabSelected === "Balances" ? "active" : "navbar-title"}>Balances</p>
        <p onClick={() => setTabSelected("Expenses")} className={tabSelected === "Expenses" ? "active" : "navbar-title"}>Expenses</p>
        <IoSettingsOutline className='settings-icon' onClick={() => setTabSelected("Settings")}/>
        </div>
    )
}
export default Navbar;