import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import tokenMiddleware from './tokenMiddleware'
import userMiddleware from './userMiddleware'
import userReducer from './user/userSlice'
export const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(tokenMiddleware),
    
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch