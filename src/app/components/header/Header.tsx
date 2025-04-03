import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { ODS_BUTTON_SIZE, ODS_BUTTON_VARIANT, ODS_ICON_NAME, OdsButton, OdsIcon } from '@ovhcloud/ods-react'
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

      <OdsButton onClick={ onSignOut }
                 size={ ODS_BUTTON_SIZE.xs }
                 variant={ ODS_BUTTON_VARIANT.outline }>
        <OdsIcon name={ ODS_ICON_NAME.shutdown } /> Sign Out
      </OdsButton>
    </div>
  )
}

Header.defaultProps = {
  className: '',
}

Header.propTypes = propTypes

export { Header }
