import type { SignInSlicePayload } from 'app/state/slices/session'
import { ODS_TEXT_LEVEL, ODS_TEXT_SIZE } from '@ovhcloud/ods-components'
import { OsdsText } from '@ovhcloud/ods-components/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAuth } from 'app/hooks/useAuth'
import { useAppSelector } from 'app/hooks/useRedux'
import { Form } from 'app/modules/signIn/components/form/Form'
import styles from './signIn.module.scss'

const SignIn = () => {
  const authContext = useAuth()
  const signInStatus = useAppSelector((state) => state.session.signInStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting && signInStatus === ACTION_STATUS.failed) {
      toast.error('Something went wrong while signing in')
      setIsSubmitting(false)
    }
  }, [isSubmitting, signInStatus])

  function onSignIn(values: SignInSlicePayload) {
    setIsSubmitting(true)
    authContext?.signIn(values)
  }

  return (
    <div className={ styles['sign-in'] }>
      <OsdsText className={ styles['sign-in__title'] }
                level={ ODS_TEXT_LEVEL.heading }
                size={ ODS_TEXT_SIZE._500 }>
        Welcome to the ODS React Playground App
      </OsdsText>

      <Form isPending={ signInStatus === ACTION_STATUS.pending }
            onSubmit={ onSignIn } />
    </div>
  )
}

export { SignIn }
export default SignIn
