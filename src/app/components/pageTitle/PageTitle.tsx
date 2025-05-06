import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { TEXT_PRESET, Text } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import styles from './pageTitle.module.scss'

const propTypes = {
  label: PropTypes.string.isRequired,
}

const PageTitle: FC<InferProps<typeof propTypes>> = ({ label }) => {
  return (
    <Text className={ styles['page-title'] }
          preset={ TEXT_PRESET.heading2 }>
      { label }
    </Text>
  )
}

PageTitle.propTypes = propTypes

export { PageTitle }
