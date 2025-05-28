import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuth } from 'firebase/auth';


export const userDataApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/finances/', prepareHeaders: async (headers) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            console.log('Token attached:', token);
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
    deleteProfileData: builder.mutation({
        query: () => ({
            url: 'user-data/',
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