import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_VARIANT, ODS_ICON_NAME } from '@ovhcloud/ods-components'
import { OdsButton, OdsCard, OdsClipboard, OdsIcon, OdsLink, OdsMedium, OdsPopover } from '@ovhcloud/ods-components/react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'app/components/link/Link'
import { ROUTE } from 'app/constants/navigation'
import { User } from 'app/models/User'
import styles from './userListItem.module.scss'

const propTypes = {
  className: PropTypes.string,
  user: PropTypes.instanceOf(User).isRequired,
}
const UserListItem: FC<InferProps<typeof propTypes>> = ({ className, user }) => {
  const actionMenuTriggerId = `header-action-trigger-${user.id}`

  return (
    <OdsCard className={ classNames(styles['user-list-item'], className) }>
      <div className={ styles['user-list-item__header'] }>
        <OdsMedium alt={ user.name }
                   height={ 40 }
                   src={ user.image }
                   width={ 40 } />

        <span>
          { user.name }
        </span>

        <OdsButton icon={ ODS_ICON_NAME.ellipsisVertical }
                   id={ actionMenuTriggerId }
                   label=""
                   variant={ ODS_BUTTON_VARIANT.ghost } />

        <OdsPopover triggerId={ actionMenuTriggerId }>
          <ul className={ styles['user-list-item__header__action-menu'] }>
            <li>
              <Link label="Update user"
                    route={ `${ROUTE.users}/${user.id}/edit` } />
            </li>
          </ul>
        </OdsPopover>
      </div>

      <div className={ styles['user-list-item__details'] }>
        <div className={ styles['user-list-item__details__email'] }>
          <OdsIcon name={ ODS_ICON_NAME.email } />

          <OdsLink href={ `mailto:${user.email}` }
                   label={ user.email } />
        </div>

        <div className={ styles['user-list-item__details__phone-number'] }>
          <OdsIcon name={ ODS_ICON_NAME.phone } />

          <OdsLink href={ `tel:${user.phone}` }
                   label={ user.phone } />
        </div>

        <div className={ styles['user-list-item__details__ip-address'] }>
          <OdsIcon name={ ODS_ICON_NAME.network } />

          <OdsClipboard value={ user.ip } />
        </div>
      </div>
    </OdsCard>
  )
}

UserListItem.propTypes = propTypes

export { UserListItem }
