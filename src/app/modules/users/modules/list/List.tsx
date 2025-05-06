import type { OdsPaginationCurrentChangeEvent, OdsPaginationItemPerPageChangedEvent } from '@ovhcloud/ods-components'
import type { User } from 'app/models/User'
import { OdsPagination } from '@ovhcloud/ods-components/react'
import { ICON_NAME, Button, Icon } from '@ovhcloud/ods-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux'
import { UserListItem } from 'app/modules/users/modules/list/components/userListItem/UserListItem'
import { list } from 'app/state/slices/users'
import styles from './list.module.scss'

const DEFAULT_PER_PAGE = 10

const List = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const count = useAppSelector((state) => state.users.count)
  const listStatus = useAppSelector((state) => state.users.listStatus)
  const users: User[] = useAppSelector((state) => state.users.users)

  useEffect(() => {
    if (listStatus === ACTION_STATUS.idle) {
      listUsers(1)
    }
  }, [dispatch, listStatus])

  function listUsers(page: number, perPage = DEFAULT_PER_PAGE) {
    dispatch(list({ page, perPage }))
  }

  function onPaginationChange({ detail }: OdsPaginationCurrentChangeEvent) {
    listUsers(detail.current, detail.itemPerPage)
  }

  function onPaginationPerPageChange({ detail }: OdsPaginationItemPerPageChangedEvent) {
    listUsers(detail.currentPage, detail.current)
  }

  return (
    <div className={ styles.list }>
      <div className={ styles['list__header'] }>
        <PageTitle label="List of users" />

        <Button onClick={ () => { navigate(`${ROUTE.users}/new`) } }>
          <Icon name={ ICON_NAME.plus } /> Create a new user
        </Button>
      </div>

      <div className={ styles['list__content'] }>
        {
          !!users ?
          <div className={ styles['list__content__users'] }>
            {
              users.map((user) => (
                <UserListItem className={ styles['list__content__users__item'] }
                              key={ user.id }
                              user={ user } />
              ))
            }
          </div> :
          <div className={ styles['list__content__mask'] }>
            <LoadingMask />
          </div>
        }

        {
          !!count &&
          <OdsPagination onOdsChange={ onPaginationChange }
                         onOdsItemPerPageChange={ onPaginationPerPageChange }
                         totalItems={ count } />
        }
      </div>
    </div>
  )
}

export { List }
export default List
