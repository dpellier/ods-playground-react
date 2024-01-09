import type { Reducer } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from 'app/state/slices/products'
import sessionReducer from 'app/state/slices/session'
import usersReducer from 'app/state/slices/users'

const combinedReducer = combineReducers({
  products: productsReducer,
  session: sessionReducer,
  users: usersReducer,
})

const rootReducer: Reducer = (state, action) => {
  if (action.type === 'session/signOut/fulfilled') {
    return combinedReducer(undefined, action)
  }
  return combinedReducer(state, action)
}

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { store }
