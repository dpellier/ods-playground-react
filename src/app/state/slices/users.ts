import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACTION_STATUS } from 'app/constants/slice'
import {
  count as countRequest,
} from 'app/state/services/users'

const count = createAsyncThunk('users/count', async () => {
  return countRequest()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    count: undefined,
    countStatus: ACTION_STATUS.idle,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(count.fulfilled, (state, action) => {
        state.count = action.payload
        state.countStatus = ACTION_STATUS.succeeded
      })
      .addCase(count.pending, (state) => {
        state.countStatus = ACTION_STATUS.pending
      })
      .addCase(count.rejected, (state) => {
        state.countStatus = ACTION_STATUS.failed
      })
  }
})

export {
  count,
}
export default usersSlice.reducer
