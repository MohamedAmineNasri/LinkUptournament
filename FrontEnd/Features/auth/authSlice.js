import { createSlice } from "@reduxjs/toolkit" 

const authSlice = createSlice({
    name: 'auth',
    //initialState: { user: null, token: null},//object to hold user and token
    initialState: { user: JSON.parse(localStorage.getItem('user')) || null, token: localStorage.getItem('token') || null },

    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
            // Persist user state
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', accessToken);
                },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        },
        setSignupCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
    },
})

export const {setCredentials, logOut,setSignupCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token