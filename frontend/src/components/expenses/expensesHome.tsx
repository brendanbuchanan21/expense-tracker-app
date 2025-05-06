import '../dashboardSection/dashboard.css'
import './expensesHome.css'
import TransactionCard from '../balances/transactionCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import { useState } from 'react';

const ExpensesHome = () => {

  const data = [{description: 'cocacola', date: '05-06-2025', type: 'Withdrawal', amount: 4.00, category: 'miscellaneous', id: '1'}];

  const [activeTab, setActiveTab] = useState('Spending');

    return (
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
              <p>You Spent</p>
              <p>$0.00</p>
              <p>Last 30 days</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div id='graph'>
              <p>Earned</p>
              <p>$500.00</p>
              <p>Last 30 days</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div id='graph'>
              <p>Spending Categories</p>
              <p>Food, Travel, Misc</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='expenses-section'>

        <div className='expenses-tab-container'>
          <button>Last 30 days</button>
          <button>All Accounts</button>
          <button>Amount: High to Low</button>
        </div>

        <div className='transactions-cards-container'>
          <TransactionCard transactions={data || []}/>
        </div>
      </div>

      </div>
    )
    
}

export default ExpensesHome;