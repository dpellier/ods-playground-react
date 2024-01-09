import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACTION_STATUS } from 'app/constants/slice'
import {
  signIn as signInRequest,
  signOut as signOutRequest,
} from 'app/state/services/session'

type SignInSlicePayload = {
  password: string
  username: string
}

const signIn = createAsyncThunk('session/signIn', async ({ password, username }: SignInSlicePayload) => {
  return signInRequest(username, password)
})

const signOut = createAsyncThunk('session/signOut', async () => {
  return signOutRequest()
})

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    signInStatus: ACTION_STATUS.idle,
    signOutStatus: ACTION_STATUS.idle,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signIn.fulfilled, (state) => {
        state.signInStatus = ACTION_STATUS.succeeded
        state.signOutStatus = ACTION_STATUS.idle
      })
      .addCase(signIn.pending, (state) => {
        state.signInStatus = ACTION_STATUS.pending
      })
      .addCase(signIn.rejected, (state) => {
        state.signInStatus = ACTION_STATUS.failed
      })

      .addCase(signOut.fulfilled, (state) => {
        state.signInStatus = ACTION_STATUS.idle
        state.signOutStatus = ACTION_STATUS.succeeded
      })
      .addCase(signOut.pending, (state) => {
        state.signOutStatus = ACTION_STATUS.pending
      })
      .addCase(signOut.rejected, (state) => {
        state.signOutStatus = ACTION_STATUS.failed
      })
  }
})

export type {
  SignInSlicePayload,
}
export {
  signIn,
  signOut,
}
export default sessionSlice.reducer
