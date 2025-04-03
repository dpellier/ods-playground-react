import type { SignInSlicePayload } from 'app/state/slices/session'
import { ODS_TEXT_PRESET, OdsText } from '@ovhcloud/ods-react'
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
      <OdsText className={ styles['sign-in__title'] }
               preset={ ODS_TEXT_PRESET.heading1 }>
        Welcome to the ODS React Playground App
      </OdsText>

      <Form isPending={ signInStatus === ACTION_STATUS.pending }
            onSubmit={ onSignIn } />
    </div>
  )
}

export { SignIn }
export default SignIn
