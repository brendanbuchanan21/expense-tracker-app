import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    uid: string | null;
    username: string | null;
}

const initialState: UserState = {
    uid: null,
    username: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUser: (state, action: PayloadAction<{ uid: string; username: string}>) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
        },
        clearUser: (state) => {
            state.uid = null;
            state.username = null;
        }
    }
})

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;