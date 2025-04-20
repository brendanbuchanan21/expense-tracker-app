import './addAccount.css'

const AddAccount = () => {

    return (
        <section id='add-account-section'>
        <div className="add-account-main-container">
            <div className='add-account-header-div'>
                <button id='add-account-cancel-btn'>Cancel</button>
                <p>Add account</p>
                <button id='add-account-save-btn'>Save</button>
            </div>

            <div className='account-name-div'>
            <input type="text" placeholder='Account Name' className='bank-input'/>
            <input type="text" placeholder='Bank Name' className='bank-input'/>
            </div>

            <div className='starting-balance-div'>
                <input type="text" disabled placeholder='US DOLLAR($)' className='starting-balance-input'/>
                <input type="text" placeholder='Starting Balance' className='starting-balance-input' />
            </div>

           <div id='space-div'></div>

           <div className='account-assign-div'>
            <input type="select" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
           </div>
        </div>
        </section>
    )
}
export default AddAccount;