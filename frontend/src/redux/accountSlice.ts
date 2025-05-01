import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// each account needs to be able to have transactions and adjust the 
// balance for each account

export interface Transaction {
    description: string;
    date: string;
    type: string;
    amount: number;
    category: string;
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
            state.accounts.push(action.payload);
        },
        addTransaction: (state, action: PayloadAction<{ accountId: number; transaction: Transaction}>) => {
            const { accountId, transaction } = action.payload;

            const account = state.accounts.find((account) => account.id === accountId);
            if (account) {
                account.transactions?.push(transaction);
                account.balance += transaction.type === "Depost" ? transaction.amount: -transaction.amount
            } 
           

        }
    }
})

export default accountSlice.reducer;

export const { addAccount } = accountSlice.actions;

