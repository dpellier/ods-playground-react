import type { UserProps } from 'app/models/User'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { UserForm } from 'app/modules/users/components/userForm/UserForm'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { User } from 'app/models/User'
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
      toast.error('Something went wrong while updating the user')
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

      <UserForm isPending={ updateStatus === ACTION_STATUS.pending }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                user={ user } />
    </div>
  )
}

export { Edit }
export default Edit
