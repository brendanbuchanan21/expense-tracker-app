import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";
import { Account } from "../accountSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/finances/accounts/`, prepareHeaders: async (headers) => {
        const auth = getAuth();
        const user = auth.currentUser
        if(user) {
            const token = await user.getIdToken();
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    } 
}),
  endpoints: (builder) => ({
    postAccountApi: builder.mutation({
        query: (account) => ({
            url: '/',
            method: "POST",
            body: account,

        })
    }),
    getAllAccountsApi: builder.query<Account[], void>({
        query: () => ({
            url: '/',
            method: "GET",
        })
    }),

  })
});

export const { usePostAccountApiMutation, useGetAllAccountsApiQuery } = accountApi;