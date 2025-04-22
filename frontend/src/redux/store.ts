import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../redux/userSlice';
import { userDataApi } from './apis/userDataApi';
import accountReducer from '../redux/accountSlice';
import { accountApi } from './apis/accountApi';


export const store = configureStore({
    reducer: {
     user: userReducer,
     accounts: accountReducer,
     [userDataApi.reducerPath]: userDataApi.reducer,
     [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userDataApi.middleware, accountApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;