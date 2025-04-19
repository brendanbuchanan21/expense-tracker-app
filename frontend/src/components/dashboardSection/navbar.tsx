import './dashboard.css'
import React from 'react';

interface NavBarProps {
    tabSelected: string,
    setTabSelected: (tab: string) => void;
}

const Navbar: React.FC<NavBarProps> = ( { tabSelected, setTabSelected } ) => {

    return (
        <div className='navbar-container'>
        <p className={tabSelected === "Activity" ? "active" : ""} onClick={() => setTabSelected("Activity")}>Activty</p>
        <p>Balances</p>
        <p>expenses</p>
        </div>
    )
}
export default Navbar;