import { GroceryListProps } from '@/types/ListTypes'
import { listDBDetails } from '@/util/misc'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: GroceryListProps = listDBDetails

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addList: (_, action:PayloadAction<GroceryListProps>) => {
      return action.payload 
    },
  }
})

// Action creators are generated for each case reducer function
export const { addList } = listSlice.actions

export default listSlice.reducer