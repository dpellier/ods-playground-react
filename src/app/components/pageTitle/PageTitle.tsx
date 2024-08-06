import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { ODS_TEXT_PRESET } from '@ovhcloud/ods-components'
import { OdsText } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import styles from './pageTitle.module.scss'

const propTypes = {
  label: PropTypes.string.isRequired,
}

const PageTitle: FC<InferProps<typeof propTypes>> = ({ label }) => {
  return (
    <OdsText className={ styles['page-title'] }
             preset={ ODS_TEXT_PRESET.heading2 }>
      { label }
    </OdsText>
  )
}

PageTitle.propTypes = propTypes

export { PageTitle }
