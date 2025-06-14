import ActivityCard from "./activityCard";
import './activity.css'
import { useGetTransactionByRangeQuery } from "../../redux/apis/transactionsApi";



const ActivityHome = () => {

    
  // Always fetch the last 30 days
  const now = new Date();
  const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const end = now.toISOString().split('T')[0];

  //query the transactions on component render
  const { data: fetchedTransactions, isLoading, error } = useGetTransactionByRangeQuery({ start, end });

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading activity. Try refreshing</p>


  // we need to combine spendings and earnings into one array
  //then map over the combined array for each card
  const allTransactions = [
    ...(fetchedTransactions?.spendings || []),
    ...(fetchedTransactions?.earnings || []),
  ];

  allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="activity-home">
          {allTransactions.length >= 1 ? (
            <p className="activity-page-header-text">Last 30 days of activity</p>
          ) : (
            <></>
          )}
            <div className="activity-cards-div">
                {allTransactions.length >= 1 ? (
      
                    allTransactions.map((transaction) => (
                    <ActivityCard key={transaction.id} data={transaction}/>
            ))
               
            ) : (
                <p className="no-activity-text">no activity in the last 30 days</p>
            )}
            </div>
            
           
        </div>
    );
}
export default ActivityHome;