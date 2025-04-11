import { OdsCard, OdsDivider } from '@ovhcloud/ods-react'
import { useEffect } from 'react'
import { LoadingContent } from 'app/components/loadingContent/LoadingContent'
import { Link } from 'app/components/link/Link'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux'
import { count as countProducts } from 'app/state/slices/products'
import { count as countUsers } from 'app/state/slices/users'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const productsCount = useAppSelector((state) => state.products.count)
  const productsCountStatus = useAppSelector((state) => state.products.countStatus)
  const usersCount = useAppSelector((state) => state.users.count)
  const usersCountStatus = useAppSelector((state) => state.users.countStatus)

  useEffect(() => {
    if (productsCountStatus === ACTION_STATUS.idle) {
      dispatch(countProducts())
    }
  }, [dispatch, productsCountStatus])

  useEffect(() => {
    if (usersCountStatus === ACTION_STATUS.idle) {
      dispatch(countUsers())
    }
  }, [dispatch, usersCountStatus])

  return (
    <div className={ styles.dashboard }>
      <PageTitle label="Overview of your playground resources" />

      <div className={ styles['dashboard__tiles'] }>
        <OdsCard className={ styles['dashboard__tiles__tile'] }>
          <span className={ styles['dashboard__tiles__tile__title'] }>
            Users
          </span>

          <OdsDivider className={ styles['dashboard__tiles__tile__divider'] } />

          <LoadingContent isPending={ usersCountStatus === ACTION_STATUS.pending }>
            <span>
              You have { usersCount } users registered
            </span>
          </LoadingContent>

          <Link className={ styles['dashboard__tiles__tile__link'] }
                label="Manage users"
                route={ ROUTE.users } />
        </OdsCard>

        <OdsCard className={ styles['dashboard__tiles__tile'] }>
          <span className={ styles['dashboard__tiles__tile__title'] }>
            Products
          </span>

          <OdsDivider className={ styles['dashboard__tiles__tile__divider'] } />

          <LoadingContent isPending={ productsCountStatus === ACTION_STATUS.pending }>
            <span>
              You have { productsCount } products registered
            </span>
          </LoadingContent>

          <Link className={ styles['dashboard__tiles__tile__link'] }
                label="Manage products"
                route={ ROUTE.products } />
        </OdsCard>
      </div>
    </div>
  )
}

export { Dashboard }
export default Dashboard
