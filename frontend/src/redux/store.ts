import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../redux/userSlice';
import { usePostUserDataMutation, userDataApi } from './apis/userDataApi';


export const store = configureStore({
    reducer: {
     user: userReducer,
     [userDataApi.reducerPath]: userDataApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;