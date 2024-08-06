import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { ODS_ICON_NAME } from '@ovhcloud/ods-components'
import { OdsLink } from '@ovhcloud/ods-components/react'
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
      <span className={ styles['header__title'] }>
        ODS React Playground
      </span>

      <OdsLink className={ styles['header__sign-out'] }
               href="#"
               icon={ ODS_ICON_NAME.shutdown }
               label="Sign Out"
               onClick={ onSignOut } />
    </div>
  )
}

Header.defaultProps = {
  className: '',
}

Header.propTypes = propTypes

export { Header }
