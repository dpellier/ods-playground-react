import type { UserProps } from 'app/models/User'
import { toast } from '@ovhcloud/ods-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FORM_SELECTOR_TAB, FormSelector } from 'app/components/formSelector/FormSelector'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { User } from 'app/models/User'
import { UserFormFormik } from 'app/modules/users/components/userForm/UserFormFormik'
import { UserFormHookForm } from 'app/modules/users/components/userForm/UserFormHookForm'
import { UserFormNative } from 'app/modules/users/components/userForm/UserFormNative'
import { UserFormTanstackForm } from 'app/modules/users/components/userForm/UserFormTanstackForm'
import { create } from 'app/state/slices/users'
import styles from './create.module.scss'

const Create = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const createStatus = useAppSelector((state) => state.users.createStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting && createStatus === ACTION_STATUS.succeeded) {
      toast.success('User successfully created')
      navigate(ROUTE.users)
    }

    if (isSubmitting && createStatus === ACTION_STATUS.failed) {
      toast.critical('Something went wrong while saving the user')
      setIsSubmitting(false)
    }
  }, [isSubmitting, createStatus])

  function onCancel() {
    navigate(ROUTE.users)
  }

  function onSubmit(user: UserProps) {
    setIsSubmitting(true)
    dispatch(create(new User(user)))
  }

  return (
    <div className={ styles.create }>
      <PageTitle label="New user" />

      <FormSelector isDisabled={ createStatus === ACTION_STATUS.pending }>
        {
          (currentTab) => {
            switch (currentTab) {
              case FORM_SELECTOR_TAB.formik:
                return (
                  <UserFormFormik isPending={ createStatus === ACTION_STATUS.pending }
                                   onCancel={ onCancel }
                                   onSubmit={ onSubmit } />
                )
              case FORM_SELECTOR_TAB.hookForm:
                return (
                  <UserFormHookForm isPending={ createStatus === ACTION_STATUS.pending }
                                    onCancel={ onCancel }
                                    onSubmit={ onSubmit } />
                )
              case FORM_SELECTOR_TAB.native:
                return (
                  <UserFormNative isPending={ createStatus === ACTION_STATUS.pending }
                                  onCancel={ onCancel }
                                  onSubmit={ onSubmit } />
                )
              case FORM_SELECTOR_TAB.tanstackForm:
                return (
                  <UserFormTanstackForm isPending={ createStatus === ACTION_STATUS.pending }
                                        onCancel={ onCancel }
                                        onSubmit={ onSubmit } />
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

export { Create }
export default Create
