import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuth } from 'firebase/auth';


export const userDataApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/finances/', prepareHeaders: async (headers) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    }
}),
 endpoints: (builder) => ({
    postUserData: builder.mutation({
        query: (body) => ({
           url: 'userData/',
           method: "POST",
           body,
    
    })
    }),
    //another mutation
}),
});

export const { usePostUserDataMutation } = userDataApi;