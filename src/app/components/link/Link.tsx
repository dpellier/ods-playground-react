import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { OsdsLink } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import { Link as LinkVendor } from 'react-router-dom'

const propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string.isRequired,
}

const Link: FC<InferProps<typeof propTypes>> = ({ children, route }) => {
  return (
    <LinkVendor to={ route }>
      <OsdsLink>
        { children }
      </OsdsLink>
    </LinkVendor>
  )
}

Link.propTypes = propTypes

export { Link }
