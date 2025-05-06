import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { Skeleton } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  isPending: PropTypes.bool.isRequired,
}

const LoadingContent: FC<InferProps<typeof propTypes>> = ({ children, isPending }) => {
  return isPending ?
    <Skeleton /> :
    children
}

LoadingContent.propTypes = propTypes

export { LoadingContent }
