import type { UserProps } from 'app/models/User'
import { toast } from '@ovhcloud/ods-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FORM_SELECTOR_TAB, FormSelector } from 'app/components/formSelector/FormSelector'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { User } from 'app/models/User'
import { UserFormFormik } from 'app/modules/users/components/userForm/UserFormFormik'
import { UserFormHookForm } from 'app/modules/users/components/userForm/UserFormHookForm'
import { UserFormNative } from 'app/modules/users/components/userForm/UserFormNative'
import { UserFormTanstackForm } from 'app/modules/users/components/userForm/UserFormTanstackForm'
import { fetch, update } from 'app/state/slices/users'
import styles from './edit.module.scss'

const Edit = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const fetchStatus = useAppSelector((state) => state.users.fetchStatus)
  const updateStatus = useAppSelector((state) => state.users.updateStatus)
  const user = useAppSelector((state) => state.users.user)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const userId = parseInt(id, 10)

      if (fetchStatus === ACTION_STATUS.idle
        || (fetchStatus === ACTION_STATUS.succeeded && user.id !== userId)) {
        dispatch(fetch(userId))
      }
    }
  }, [dispatch, fetchStatus, id])

  useEffect(() => {
    if (isSubmitting && updateStatus === ACTION_STATUS.succeeded) {
      toast.success('User successfully updated')
      navigate(ROUTE.users)
    }

    if (isSubmitting && updateStatus === ACTION_STATUS.failed) {
      toast.critical('Something went wrong while updating the user')
      setIsSubmitting(false)
    }
  }, [isSubmitting, updateStatus])

  function onCancel() {
    navigate(ROUTE.users)
  }

  function onSubmit(user: UserProps) {
    setIsSubmitting(true)
    dispatch(update(new User(user)))
  }

  if (fetchStatus !== ACTION_STATUS.succeeded) {
    return <LoadingMask />
  }

  return (
    <div className={ styles.edit }>
      <PageTitle label={ `Edit user "${user.name}"` } />

      <FormSelector isDisabled={ updateStatus === ACTION_STATUS.pending }>
        {
          (currentTab) => {
            switch (currentTab) {
              case FORM_SELECTOR_TAB.formik:
                return (
                  <UserFormFormik isPending={ updateStatus === ACTION_STATUS.pending }
                                   onCancel={ onCancel }
                                   onSubmit={ onSubmit }
                                   user={ user } />
                )
              case FORM_SELECTOR_TAB.hookForm:
                return (
                  <UserFormHookForm isPending={ updateStatus === ACTION_STATUS.pending }
                                    onCancel={ onCancel }
                                    onSubmit={ onSubmit }
                                    user={ user } />
                )
              case FORM_SELECTOR_TAB.native:
                return (
                  <UserFormNative isPending={ updateStatus === ACTION_STATUS.pending }
                                  onCancel={ onCancel }
                                  onSubmit={ onSubmit }
                                  user={ user } />
                )
              case FORM_SELECTOR_TAB.tanstackForm:
                return (
                  <UserFormTanstackForm isPending={ updateStatus === ACTION_STATUS.pending }
                                        onCancel={ onCancel }
                                        onSubmit={ onSubmit }
                                        user={ user } />
                )
              default:
                return ''
            }
          }
        }
      </FormSelector>
    </div>
  )
}

export { Edit }
export default Edit
