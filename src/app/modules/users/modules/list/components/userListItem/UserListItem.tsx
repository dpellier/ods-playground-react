import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { OdsClipboard, OdsMedium } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, ODS_ICON_NAME, ODS_POPOVER_POSITION, OdsButton, OdsCard, OdsIcon, OdsLink, OdsPopover, OdsPopoverContent, OdsPopoverTrigger } from '@ovhcloud/ods-react'
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

        <OdsPopover position={ ODS_POPOVER_POSITION.bottom }>
          <OdsPopoverTrigger asChild>
            <OdsButton variant={ ODS_BUTTON_VARIANT.ghost }>
              <OdsIcon name={ ODS_ICON_NAME.ellipsisVertical } />
            </OdsButton>
          </OdsPopoverTrigger>

          <OdsPopoverContent>
            <ul className={ styles['user-list-item__header__action-menu'] }>
              <li>
                <Link label="Update user"
                      route={ `${ROUTE.users}/${user.id}/edit` } />
              </li>
            </ul>
          </OdsPopoverContent>
        </OdsPopover>
      </div>

      <div className={ styles['user-list-item__details'] }>
        <div className={ styles['user-list-item__details__email'] }>
          <OdsIcon name={ ODS_ICON_NAME.email } />

          <OdsLink href={ `mailto:${user.email}` }>
            { user.email }
          </OdsLink>
        </div>

        <div className={ styles['user-list-item__details__phone-number'] }>
          <OdsIcon name={ ODS_ICON_NAME.phone } />

          <OdsLink href={ `tel:${user.phone}` }>
            { user.phone }
          </OdsLink>
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
