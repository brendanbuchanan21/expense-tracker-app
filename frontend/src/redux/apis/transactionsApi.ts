import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/finances/transactions/', prepareHeaders: async (headers) => {
        
    }})
})
