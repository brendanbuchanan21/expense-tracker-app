import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Account {
    userId: string;
    accountName: string;
    bankName: string;
    balance: Number;
    typeOfAccount: string;
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
        }
    }
})

export default accountSlice.reducer;

export const { addAccount } = accountSlice.actions;

