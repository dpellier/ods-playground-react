import type { UserProps } from 'app/models/User'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { UserForm } from 'app/modules/users/components/userForm/UserForm'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { User } from 'app/models/User'
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
      toast.error('Something went wrong while saving the user')
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

      <UserForm isPending={ createStatus === ACTION_STATUS.pending }
                onCancel={ onCancel }
                onSubmit={ onSubmit } />
    </div>
  )
}

export { Create }
export default Create
