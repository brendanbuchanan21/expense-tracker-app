import '../dashboardSection/dashboard.css'
import './expensesHome.css'
import TransactionCard from '../balances/transactionCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import { useEffect, useState } from 'react';
import { useGetTransactionByRangeQuery} from '../../redux/apis/transactionsApi';
import { ImSpinner } from 'react-icons/im';
import SpendingLineChart from './chartComponent';
import PieChartComponent from './pieChart';
import DaysPopUP from './daysPopUp';
import './daysPopUp.css'


const getStartAndEndDates = (selected: string): { start: string; end: string } => {
  const now = new Date();

  if (selected === 'Last 30 Days') {
    const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return {
      start: start.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0],
    };
  }

  const [monthName, yearStr] = selected.split(' ');
  const year = parseInt(yearStr);
  const month = new Date(`${monthName} 1, ${year}`).getMonth();

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};

const ExpensesHome = () => {
  // default last 30 days of transactions for spending
  
  
  
  const [activeTab, setActiveTab] = useState('Spending');
  const [lastThirtyPopUp, setLastThirtyPopUp] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("Last 30 Days");
  const [dateOptions, setDateOptions] = useState<string[]>([]);


  const { start, end } = getStartAndEndDates(selectedDate);
  const { data, isLoading } = useGetTransactionByRangeQuery({ start, end });
  const spendings = data?.spendings || [];
  const earnings = data?.earnings || [];
  const spendingsTotal = spendings.reduce((acc: number, t: any) => acc + parseFloat(t.amount), 0);
  const earningsTotal = earnings.reduce((acc: number, t: any) => acc + parseFloat(t.amount), 0);
  
  console.log('here is the backend response', data);

  const selectedTransactions = activeTab === 'Spending'
  ? spendings.map((s: { date: string; amount: string }) => ({
      date: s.date,
      amount: parseFloat(s.amount),
    }))
  : earnings.map((s: { date: string; amount: string }) => ({
      date: s.date,
      amount: parseFloat(s.amount),
    }));

     // Conditional variable assignment
    const aggregatedData = activeTab === 'Spending'
    ? spendings.map((s: { date: string; amount: string; category: string }) => ({
        amount: s.amount,
        category: s.category,
      }))
    : earnings.map((s: { date: string; amount: string; category: string }) => ({
        amount: s.amount,
        category: s.category,
      }));
      


      const generateDateOptions = () => {
        const options = ["Last 30 Days"];
        const now = new Date();
      
        for (let i = 0; i < 4; i++) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear();
          options.push(`${month} ${year}`);
        }
      
        return options;
      };
      
      

      useEffect(() => {
        setDateOptions(generateDateOptions());
      }, []);

    

    

    return (
      <>
      <div className='display-container'>
      <div className='nav-header-container'>
        <div onClick={() => setActiveTab("Spending")} className={activeTab === "Spending" ? 'activeTab' : 'nonActiveTab'}>Spending</div>
        <div className={activeTab === "Earnings" ? 'activeTab' : 'nonActiveTab'} onClick={() => setActiveTab("Earnings")}>Earnings</div>
      </div>

      <div className='graph-section'>
      <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          style={{ minHeight: '13rem' }}
          className='my-swiper'
        >
          <SwiperSlide>
            <div id='graph'>
              {isLoading ? (
                <ImSpinner className='swiper-spinner'/>
              ) : (
                <>
                {activeTab === 'Spending' ? (
                  <>
                  <p>You Spent</p>
                  <p>${spendingsTotal.toFixed(2)}</p>
                  <p>Last 30 days</p>
                  </>
                ) : (
                  <>
                  <p>You Earned</p>
                  <p>${earningsTotal.toFixed(2)}</p>
                  <p>Last 30 days</p>
                  </>
                )}
              </>
              )}
              
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div id='graph'>
            <SpendingLineChart transactions={selectedTransactions}/>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div id='graph'>
           <PieChartComponent data={aggregatedData}/>

            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='expenses-section'>

        <div className='expenses-tab-container'>
          <button onClick={() => setLastThirtyPopUp(true)}>Last 30 days</button>
          <button>All Accounts</button>
          <button>Amount: High to Low</button>
        </div>

        <div className='transactions-cards-container'>
          <TransactionCard transactions={activeTab === 'Spending' ? spendings : earnings} activeTab={activeTab}/>
        </div>
      </div>
      </div>
     

     <div>
     {lastThirtyPopUp && (
      <div className='overlay'>
      <DaysPopUP onClose={() => setLastThirtyPopUp(false)} selected={selectedDate} onSelect={setSelectedDate} dateOptions={dateOptions}/>
      </div>
   )}
   </div>
      </>
      
    )
    
}

export default ExpensesHome;