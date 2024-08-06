import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { OdsLink } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import { Link as LinkVendor } from 'react-router-dom'

const propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
}

const Link: FC<InferProps<typeof propTypes>> = ({ label, route }) => {
  return (
    <LinkVendor to={ route }>
      <OdsLink href=""
               label={ label }>
      </OdsLink>
    </LinkVendor>
  )
}

Link.propTypes = propTypes

export { Link }
