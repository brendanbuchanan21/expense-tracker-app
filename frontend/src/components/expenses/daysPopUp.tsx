import React from "react";
import './daysPopUp.css';
import { IoIosArrowDown } from "react-icons/io";

interface DaysPopUpProps {
    onClose: () => void;
    selected: string;
    onSelect: (value: string) => void;
    dateOptions: string[];
}

const DaysPopUP: React.FC<DaysPopUpProps> = ({ onClose, selected, onSelect, dateOptions }) => {



    return (
      <div className="modalBox">
        <button onClick={onClose} className="date-pop-up-close-btn">Close</button>
        <p>All Transactions</p>
        {dateOptions.map((label, index) => (
            <div className="date-div" key={index} onClick={() => onSelect(label)}>
                <p>{label}</p>
                <button className={selected === label ? 'active-select-date-btn' : 'date-select-btn'} ></button>
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