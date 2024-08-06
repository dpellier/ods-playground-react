import type { User } from 'app/models/User'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACTION_STATUS } from 'app/constants/slice'
import {
  count as countRequest,
  create as createRequest,
  fetch as fetchRequest,
  list as listRequest,
  update as updateRequest,
} from 'app/state/services/users'

type UserReducerState = {
  count?: number,
  countStatus: ACTION_STATUS,
  createStatus: ACTION_STATUS,
  fetchStatus: ACTION_STATUS,
  listStatus: ACTION_STATUS,
  user?: User,
  users?: User[],
  updateStatus: ACTION_STATUS,
}

type ListActionPayload = {
  page?: number,
  perPage?: number,
}

const initialState: UserReducerState = {
  count: undefined,
  countStatus: ACTION_STATUS.idle,
  createStatus: ACTION_STATUS.idle,
  fetchStatus: ACTION_STATUS.idle,
  listStatus: ACTION_STATUS.idle,
  user: undefined,
  users: undefined,
  updateStatus: ACTION_STATUS.idle,
}

const count = createAsyncThunk('users/count', async () => {
  return countRequest()
})

const create = createAsyncThunk('users/create', async (user: User) => {
  return createRequest(user)
})

const fetch = createAsyncThunk('users/fetch', async (id: number) => {
  return fetchRequest(id)
})

const list = createAsyncThunk('users/list', async ({ page, perPage }: ListActionPayload) => {
  return listRequest(page, perPage)
})

const update = createAsyncThunk('users/update', async (user: User) => {
  return updateRequest(user)
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
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

      .addCase(create.fulfilled, (state, action) => {
        state.createStatus = ACTION_STATUS.succeeded
        state.user = action.payload
        state.users = (state.users || []).concat([action.payload])
      })
      .addCase(create.pending, (state) => {
        state.createStatus = ACTION_STATUS.pending
      })
      .addCase(create.rejected, (state) => {
        state.createStatus = ACTION_STATUS.failed
      })

      .addCase(fetch.fulfilled, (state, action) => {
        state.fetchStatus = ACTION_STATUS.succeeded
        state.user = action.payload
      })
      .addCase(fetch.pending, (state) => {
        state.fetchStatus = ACTION_STATUS.pending
      })
      .addCase(fetch.rejected, (state) => {
        state.fetchStatus = ACTION_STATUS.failed
      })

      .addCase(list.fulfilled, (state, action) => {
        state.count = action.payload.count
        state.listStatus = ACTION_STATUS.succeeded
        state.users = action.payload.users
      })
      .addCase(list.pending, (state) => {
        state.listStatus = ACTION_STATUS.pending
      })
      .addCase(list.rejected, (state) => {
        state.listStatus = ACTION_STATUS.failed
      })

      .addCase(update.fulfilled, (state, action) => {
        state.updateStatus = ACTION_STATUS.succeeded
        state.user = action.payload
        state.users = (state.users || []).map((user) => (
          user.id === action.payload.id ? action.payload : user
        ))
      })
      .addCase(update.pending, (state) => {
        state.updateStatus = ACTION_STATUS.pending
      })
      .addCase(update.rejected, (state) => {
        state.updateStatus = ACTION_STATUS.failed
      })
  }
})

export {
  count,
  create,
  fetch,
  list,
  update,
}
export default usersSlice.reducer
