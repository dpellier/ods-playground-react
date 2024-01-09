import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { ODS_ICON_NAME, ODS_ICON_SIZE, ODS_TEXT_LEVEL } from '@ovhcloud/ods-components'
import { OsdsIcon, OsdsLink, OsdsText } from '@ovhcloud/ods-components/react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import styles from './header.module.scss'

const propTypes = {
  className: PropTypes.string,
  onSignOut: PropTypes.func.isRequired,
}

const Header: FC<InferProps<typeof propTypes>> = ({ className, onSignOut }) => {
  return (
    <div className={ classNames(styles.header, className) }>
      <OsdsText contrasted={ true }
                level={ ODS_TEXT_LEVEL.heading }>
        ODS React Playground
      </OsdsText>

      <OsdsLink contrasted={ true }
                onClick={ onSignOut }>
        <OsdsText contrasted={ true }>
          Sign Out
        </OsdsText>

        <OsdsIcon className={ styles['header__sign-out__icon'] }
                  contrasted={ true }
                  name={ ODS_ICON_NAME.IMPORT_CONCEPT }
                  size={ ODS_ICON_SIZE.xs }
                  slot="end" />
      </OsdsLink>
    </div>
  )
}

Header.defaultProps = {
  className: '',
}

Header.propTypes = propTypes

export { Header }
