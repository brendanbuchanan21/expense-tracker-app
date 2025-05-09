import React from "react";
import './daysPopUp.css';
import { IoIosArrowDown } from "react-icons/io";

interface DaysPopUpProps {
    onClose: () => void;
    selected: string;
    onSelect: (value: string) => void;
}

const DaysPopUP: React.FC<DaysPopUpProps> = ({ onClose, selected, onSelect }) => {


    const months = [
    {month: 'Last 30 Days'},
    {month: 'May 2025'},
    {month: 'April 2025'},
    {month: 'March 2025'}
    ];

    return (
      <div className="modalBox">
        <button onClick={onClose} className="date-pop-up-close-btn">Close</button>
        <p>All Transactions</p>
        {months.map((month, index) => (
            <div className="date-div" key={index} onClick={() => onSelect(month.month)}>
                <p>{month.month}</p>
                <button className={selected === month.month ? 'active-select-date-btn' : 'date-select-btn'} ></button>
            </div>
        ))}
        <div className="date-div">
            <p>More Time Periods</p>
            <IoIosArrowDown className="date-arrow-pop-up"/>
        </div>
        
      </div>
    );
  };

export default DaysPopUP;