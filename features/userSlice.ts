import { UserDBType, UserDetailsType } from '@/types/userTypes'
import { userDetails, userDBDetails } from '@/util/misc'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserDBType = userDBDetails

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (_, action:PayloadAction<UserDBType>) => {
      return action.payload 
    },
  }
})

// Action creators are generated for each case reducer function
export const { addUser } = usersSlice.actions

export default usersSlice.reducer