import type { InferProps } from 'prop-types'
import type { SignInSlicePayload } from 'app/state/slices/session'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ACTION_STATUS } from 'app/constants/slice'
import { hasSessionToken } from 'app/helpers/session'
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux'
import {
  signIn as signInAction,
  signOut as signOutAction,
} from 'app/state/slices/session'

type AuthContextType = {
  isLogged: boolean
  signIn: (values: SignInSlicePayload) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const propTypes = {
  children: PropTypes.node.isRequired,
}

function AuthProvider({ children }: InferProps<typeof propTypes>) {
  const dispatch = useAppDispatch()
  const [isLogged, setIsLogged] = useState(hasSessionToken())
  const signInStatus = useAppSelector((state) => state.session.signInStatus)
  const signOutStatus = useAppSelector((state) => state.session.signOutStatus)

  useEffect(() => {
    if (!isLogged && signInStatus === ACTION_STATUS.succeeded) {
      setIsLogged(true)
    }
  }, [isLogged, signInStatus])

  useEffect(() => {
    if (isLogged && signOutStatus === ACTION_STATUS.succeeded) {
      setIsLogged(false)
    }
  }, [isLogged, signOutStatus])

  function signIn(values: SignInSlicePayload) {
    dispatch(signInAction(values))
  }

  function signOut() {
    dispatch(signOutAction())
  }

  const memoizedValue = useMemo(() => ({
    isLogged,
    signIn,
    signOut,
  }), [isLogged])

  return (
    <AuthContext.Provider value={ memoizedValue }>
      { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = propTypes

function useAuth() {
  return useContext(AuthContext)
}

export {
  AuthProvider,
  useAuth,
}
