import './activity.css'
import React from 'react'

interface ActivityCardProps {
    data: any;
}

const ActivityCard: React.FC<ActivityCardProps> = ({data}) => {

    if (!data)  return null;
    return (
             <div className="activity-card" >
            <div className="activity-card-header-text">
                <p>{data.description}</p>
                <p className='activity-description-text'>{data.category} {data.date}</p>
            </div>
            <div className="activity-card-header-amount">
                <p>{data.type === "Deposit" ? `+$${data.amount}` : `-$${data.amount}`}</p>
            </div>
        </div>
    )
}

export default ActivityCard;