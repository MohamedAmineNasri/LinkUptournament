import { apiSlice } from "../../app/api/apiSlice"; 

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/user/login',
                method: 'Post',
                body: {...credentials}
            })
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: '/user/register', 
                method: 'POST',
                body: { ...userData },
            }),
        }),
    })
})

export const {useLoginMutation,useSignupMutation } = authApiSlice