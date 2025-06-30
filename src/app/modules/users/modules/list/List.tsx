import type { PaginationPageChangeDetail } from '@ovhcloud/ods-react'
import type { User } from 'app/models/User'
import { ICON_NAME, Button, Icon, Pagination } from '@ovhcloud/ods-react'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux'
import { UserListItem } from 'app/modules/users/modules/list/components/userListItem/UserListItem'
import { list } from 'app/state/slices/users'
import styles from './list.module.scss'

const DEFAULT_PER_PAGE = 10

const List = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const count = useAppSelector((state) => state.users.count)
  const users: User[] = useAppSelector((state) => state.users.users)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PER_PAGE)

  useEffect(() => {
    listUsers()
  }, [currentPage, pageSize])

  function listUsers() {
    dispatch(list({ page: currentPage, perPage: pageSize }))
  }

  function onPaginationChange({ page }: PaginationPageChangeDetail) {
    setCurrentPage(page)
  }

  // TODO waiting for ODS patch
  function onPaginationPerPageChange({ pageSize }: any) {
    setPageSize(pageSize)
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
          <Pagination onPageChange={ onPaginationChange }
                      // @ts-ignore waiting for ODS patch
                      onPageSizeChange={ onPaginationPerPageChange }
                      pageSize={ pageSize }
                      totalItems={ count }
                      // withPageSizeSelector // TODO waiting for ODS patch
          />
        }
      </div>
    </div>
  )
}

export { List }
export default List
