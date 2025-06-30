import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { BUTTON_VARIANT, ICON_NAME, POPOVER_POSITION, Button, Card, Clipboard, ClipboardControl, ClipboardTrigger, Icon, Link as OdsLink, Medium, Popover, PopoverContent, PopoverTrigger } from '@ovhcloud/ods-react'
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
    <Card className={ classNames(styles['user-list-item'], className) }>
      <div className={ styles['user-list-item__header'] }>
        <Medium alt={ user.name }
                height={ 40 }
                src={ user.image }
                width={ 40 } />

        <span>
          { user.name }
        </span>

        <Popover position={ POPOVER_POSITION.bottom }>
          <PopoverTrigger asChild>
            <Button variant={ BUTTON_VARIANT.ghost }>
              <Icon name={ ICON_NAME.ellipsisVertical } />
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <ul className={ styles['user-list-item__header__action-menu'] }>
              <li>
                <Link route={ `${ROUTE.users}/${user.id}/edit` }>
                  Update user
                </Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className={ styles['user-list-item__details'] }>
        <div className={ styles['user-list-item__details__email'] }>
          <Icon name={ ICON_NAME.email } />

          <OdsLink href={ `mailto:${user.email}` }>
            { user.email }
          </OdsLink>
        </div>

        <div className={ styles['user-list-item__details__phone-number'] }>
          <Icon name={ ICON_NAME.phone } />

          <OdsLink href={ `tel:${user.phone}` }>
            { user.phone }
          </OdsLink>
        </div>

        <div className={ styles['user-list-item__details__ip-address'] }>
          <Icon name={ ICON_NAME.network } />

          <Clipboard value={ user.ip }>
            <ClipboardControl />

            <ClipboardTrigger />
          </Clipboard>
        </div>
      </div>
    </Card>
  )
}

UserListItem.propTypes = propTypes

export { UserListItem }
