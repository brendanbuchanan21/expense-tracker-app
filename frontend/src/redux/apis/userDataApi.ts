import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuth } from 'firebase/auth';

const BASE_URL = process.env.REACT_APP_API_URL;

export const userDataApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/finances/`, prepareHeaders: async (headers) => {
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
           url: 'user/',
           method: "POST",
           body,
    
    })
    }),
    postUserProfilePicture: builder.mutation({
        query: (formData) => ({
            url: 'profile-picture/',
            method: "POST",
            body: formData,
        })
    }),
    deleteProfileData: builder.mutation<void, void>({
        query: () => ({
            url: 'user-delete/',
            method: "DELETE"
        })
    }),
    resetUserData: builder.mutation<void, void>({
        query: () => ({
            url: 'user-reset/',
            method: "DELETE"
        })
    })
    //another mutation
}),
});

export const { usePostUserDataMutation, usePostUserProfilePictureMutation, useDeleteProfileDataMutation, useResetUserDataMutation } = userDataApi;