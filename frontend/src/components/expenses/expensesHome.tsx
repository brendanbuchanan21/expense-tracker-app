import '../dashboardSection/dashboard.css'
import './expensesHome.css'
import TransactionCard from '../balances/transactionCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import { useEffect, useState } from 'react';
import { useGetLastThirtyTransactionsApiQuery } from '../../redux/apis/transactionsApi';
import { ImSpinner } from 'react-icons/im';
import SpendingLineChart from './chartComponent';
import PieChartComponent from './pieChart';
import DaysPopUP from './daysPopUp';
import './daysPopUp.css'

const ExpensesHome = () => {

  // const data = [{description: 'cocacola', date: '05-06-2025', type: 'Withdrawal', amount: 4.00, category: 'miscellaneous', id: '1'}];

  
  // default last 30 days of transactions for spending
  const { data, isLoading } = useGetLastThirtyTransactionsApiQuery(undefined);
  console.log('🌎', data);
  const spendings = data?.spendings || [];
  const earnings = data?.earnings || [];
  const [activeTab, setActiveTab] = useState('Spending');
  const [lastThirtyPopUp, setLastThirtyPopUp] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("Last 30 Days");

  useEffect(() => {
    if (selectedDate === "Last 30 Days") {
      
    }

  }, [selectedDate])

  const spendingsThirtyDayTotal = spendings.reduce((acc: number, transaction: any) => {
    return acc + parseFloat(transaction.amount);
  }, 0);
  console.log(spendingsThirtyDayTotal, 'here is the total amount for spendings')

  const earningsThirtyDayTotal = earnings.reduce((acc: number, transaction: any) => {
    return acc + parseFloat(transaction.amount)
  }, 0)
  console.log(earningsThirtyDayTotal, 'total earnings');

  // Map the data to match the expected structure for the chart
  const chartData = spendings.map((s: any) => ({
    date: s.date,
    amount: parseFloat(s.amount),
  }));

  console.log(chartData, '🌟')
  console.log('current selected date', selectedDate);

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
                  <p>${spendingsThirtyDayTotal.toFixed(2)}</p>
                  <p>Last 30 days</p>
                  </>
                ) : (
                  <>
                  <p>You Earned</p>
                  <p>${earningsThirtyDayTotal.toFixed(2)}</p>
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
      <DaysPopUP onClose={() => setLastThirtyPopUp(false)} selected={selectedDate} onSelect={setSelectedDate}/>
      </div>
   )}
   </div>
      </>
      
    )
    
}

export default ExpensesHome;