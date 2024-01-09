import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming'
import { ODS_DIVIDER_SIZE, ODS_TEXT_COLOR_INTENT, ODS_TEXT_LEVEL, ODS_TEXT_SIZE } from '@ovhcloud/ods-components'
import { OsdsDivider, OsdsText, OsdsTile } from '@ovhcloud/ods-components/react'
import { useEffect } from 'react'
import { LoadingContent } from 'app/components/loadingContent/LoadingContent'
import { Link } from 'app/components/link/Link'
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
      <OsdsText className={ styles['dashboard__title'] }
                color={ ODS_TEXT_COLOR_INTENT.primary }
                level={ ODS_TEXT_LEVEL.heading }
                size={ ODS_TEXT_SIZE._600 }>
        Overview of your playground resources
      </OsdsText>

      <div className={ styles['dashboard__tiles'] }>
        <OsdsTile className={ styles['dashboard__tiles__tile'] }
                  color={ ODS_THEME_COLOR_INTENT.primary }>
          <div className={ styles['dashboard__tiles__tile__content'] }>
            <OsdsText color={ ODS_TEXT_COLOR_INTENT.primary }
                      level={ ODS_TEXT_LEVEL.heading }
                      size={ ODS_TEXT_SIZE._300 }>
              Users
            </OsdsText>

            <OsdsDivider color={ ODS_THEME_COLOR_INTENT.primary }
                         separator={ true }
                         size={ ODS_DIVIDER_SIZE.six } />

            <LoadingContent isPending={ usersCountStatus === ACTION_STATUS.pending }>
              <OsdsText color={ ODS_TEXT_COLOR_INTENT.text }
                        level={ ODS_TEXT_LEVEL.body }>
                You have { usersCount } users registered
              </OsdsText>
            </LoadingContent>

            <OsdsDivider size={ ODS_DIVIDER_SIZE.four } />

            <Link route={ ROUTE.users }>
              Manage users
            </Link>
          </div>
        </OsdsTile>

        <OsdsTile className={ styles['dashboard__tiles__tile'] }
                  color={ ODS_THEME_COLOR_INTENT.primary }>
          <div className={ styles['dashboard__tiles__tile__content'] }>
            <OsdsText color={ ODS_TEXT_COLOR_INTENT.primary }
                      level={ ODS_TEXT_LEVEL.heading }
                      size={ ODS_TEXT_SIZE._300 }>
              Products
            </OsdsText>

            <OsdsDivider color={ ODS_THEME_COLOR_INTENT.primary }
                         separator={ true }
                         size={ ODS_DIVIDER_SIZE.six } />

            <LoadingContent isPending={ productsCountStatus === ACTION_STATUS.pending }>
              <OsdsText color={ ODS_TEXT_COLOR_INTENT.text }
                        level={ ODS_TEXT_LEVEL.body }>
                You have { productsCount } products registered
              </OsdsText>
            </LoadingContent>

            <OsdsDivider size={ ODS_DIVIDER_SIZE.four } />

            <Link route={ ROUTE.products }>
              Manage products
            </Link>
          </div>
        </OsdsTile>
      </div>
    </div>
  )
}

export { Dashboard }
export default Dashboard
