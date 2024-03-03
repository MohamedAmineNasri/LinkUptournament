import { createApi, fetchBaseQuery } from  '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../Features/auth/authSlice' 

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    //to ensures that cookies are sent with each request
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token//sending access token that in the current state
        if ( token ) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
        //Attaching the access token to the header everytime with every request
        //likewise if we have a cookie we're attaching those credentials in the cookie every time
    }
})

//This pattern allows for automatic token refreshing and reauthentication when necessary
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        //Sending a refresh token to get new access token
        const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data) {
            const user = api.getState().auth.user
            //Store the new Token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            //Retry the orginal query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})