import './activity.css'


const ActivityCard = () => {
    return (
        <div className="activity-card">
            <div className="activity-card-header-text">
                <p>Returned TV</p>
                <p className='activity-description-text'>Shopping and fun 3/15</p>
            </div>
            <div className="activity-card-header-amount">
                <p>$500.01</p>
            </div>
        </div>
    )
}

export default ActivityCard;