import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import classNames from 'classnames'
import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming'
import { ODS_BUTTON_TYPES, ODS_SPINNER_SIZE } from '@ovhcloud/ods-components'
import { OsdsButton, OsdsSpinner } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import styles from './loadingButton.module.scss'

const propTypes = {
  children: PropTypes.node.isRequired,
  isPending: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  slot: PropTypes.string,
  type: PropTypes.oneOf(ODS_BUTTON_TYPES).isRequired
}

const LoadingButton: FC<InferProps<typeof propTypes>> = ({ children, isPending, onClick, slot, type }) => {
  return (
    <OsdsButton className={ styles['loading-button'] }
                color={ ODS_THEME_COLOR_INTENT.primary }
                disabled={ isPending ? true : undefined }
                onClick={ !!onClick ? onClick : undefined }
                slot={ !!slot ? slot : undefined }
                type={ type  }>
      {
        isPending &&
        <OsdsSpinner className={ styles['loading-button__spinner'] }
                     contrasted={ true }
                     inline={ true }
                     size={ ODS_SPINNER_SIZE.sm } />
      }

      <div className={ classNames({ [styles['loading-button__content--hidden']]: isPending })}>
        { children }
      </div>
    </OsdsButton>
  )
}

LoadingButton.propTypes = propTypes

export { LoadingButton }
