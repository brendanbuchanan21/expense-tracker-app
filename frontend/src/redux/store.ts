import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../redux/userSlice';
import { usePostUserDataMutation, userDataApi } from './apis/userDataApi';
import accountReducer from '../redux/accountSlice';


export const store = configureStore({
    reducer: {
     user: userReducer,
     accounts: accountReducer,
     [userDataApi.reducerPath]: userDataApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;