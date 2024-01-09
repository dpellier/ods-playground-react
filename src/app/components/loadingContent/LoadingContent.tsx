import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { OsdsSkeleton } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  isPending: PropTypes.bool.isRequired,
}

const LoadingContent: FC<InferProps<typeof propTypes>> = ({ children, isPending }) => {
  return isPending ?
    <OsdsSkeleton /> :
    children
}

LoadingContent.propTypes = propTypes

export { LoadingContent }
