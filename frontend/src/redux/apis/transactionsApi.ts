import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";

const BASE_URL = import.meta.env.VITE_API_URL;

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    tagTypes: ['Transactions'] as const,
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/finances/transactions/`, prepareHeaders: async (headers) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            headers.set('Authorization', `Bearer ${token}`)
        } 
        return headers;
    }}
),
        endpoints: (builder) => ({
            addTransactionApi: builder.mutation({
                query: (transaction) => ({
                    url: '/',
                    method: "POST",
                    body: transaction
                }),
                invalidatesTags: ['Transactions'],
            }),
            getAllTransactions: builder.query({
                query: (accountId) => ({
                    url: `/${accountId}/`,
                    method: "GET",
                })
            }),
            getTransactionByRange: builder.query({
                query: ({start, end}) => ({
                    url: `/by-range/?start=${start}&end=${end}`,
                    method: "GET",
                }),
                providesTags: ['Transactions'],
            })
        })
})

export const { useAddTransactionApiMutation, useGetAllTransactionsQuery, useGetTransactionByRangeQuery } = transactionApi;
