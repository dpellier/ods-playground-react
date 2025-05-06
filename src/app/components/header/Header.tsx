import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { BUTTON_SIZE, BUTTON_VARIANT, ICON_NAME, Button, Icon } from '@ovhcloud/ods-react'
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

      <Button onClick={ onSignOut }
              size={ BUTTON_SIZE.xs }
              variant={ BUTTON_VARIANT.outline }>
        <Icon name={ ICON_NAME.shutdown } /> Sign Out
      </Button>
    </div>
  )
}

Header.defaultProps = {
  className: '',
}

Header.propTypes = propTypes

export { Header }
