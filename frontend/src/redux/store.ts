import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../redux/userSlice';
import { userDataApi } from './apis/userDataApi';
import accountReducer from '../redux/accountSlice';
import { accountApi } from './apis/accountApi';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'



const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['profilePictureUrl'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer)


export const store = configureStore({
    reducer: {
     user: persistedUserReducer,
     accounts: accountReducer,
     [userDataApi.reducerPath]: userDataApi.reducer,
     [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userDataApi.middleware, accountApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;