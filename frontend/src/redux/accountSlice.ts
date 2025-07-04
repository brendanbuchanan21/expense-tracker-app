import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// each account needs to be able to have transactions and adjust the 
// balance for each account

export interface Transaction {
    description: string;
    date: string;
    type: string;
    amount: number;
    category: string;
    id?: string;
}

export interface Account {
    userId: string;
    id?: number;
    accountName: string;
    bankName: string;
    balance: number;
    typeOfAccount: string;
    transactions?: Transaction[];
}

interface AccountState {
    accounts: Account[];
}

const initialState: AccountState = {
    accounts: [],
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
        const exists = state.accounts.some(acc => acc.id === action.payload.id);
        if (!exists) {
            state.accounts.push(action.payload);
        }
        },

        addTransaction: (state, action: PayloadAction<{ accountId: number; transaction: Transaction}>) => {
            const { accountId, transaction } = action.payload;

            const account = state.accounts.find((account) => account.id === accountId);

            if (account) {
                if (!account.transactions) {
                    account.transactions = [];
                }
                account.transactions.push(transaction);
                const amount = Number(transaction.amount);
                account.balance = Number(account.balance) + (transaction.type === "Deposit" ? amount : -amount);
                //account balance = account balance = 
            }

        }
    }
})

export default accountSlice.reducer;

export const { addAccount, addTransaction } = accountSlice.actions;

