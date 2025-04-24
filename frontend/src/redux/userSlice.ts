import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    uid: string | null;
    username: string | null;
    profilePictureUrl: string | null;
}

const initialState: UserState = {
    uid: null,
    username: null,
    profilePictureUrl: null,
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
            state.profilePictureUrl = null;
        },
        addProfilePicture: (state, action: PayloadAction<string>) => {
            state.profilePictureUrl = action.payload;
        }

    }
})

export default userSlice.reducer;

export const { setUser, clearUser, addProfilePicture } = userSlice.actions;