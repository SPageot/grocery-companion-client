import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../features/userSlice"
import listReducer from "../features/listSlice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
    list: listReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;