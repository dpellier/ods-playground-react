import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { Link as OdsLink } from '@ovhcloud/ods-react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './link.module.scss'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  route: PropTypes.string.isRequired,
}

const Link: FC<InferProps<typeof propTypes>> = forwardRef<HTMLAnchorElement, InferProps<typeof propTypes>>(({ children, className, route }, ref) => {
  return (
    <OdsLink as={ RouterLink }
             className={ classNames(styles.link, className) }
             ref={ ref }
             to={ route }>
      { children }
    </OdsLink>
  )
})

Link.propTypes = propTypes

export { Link }
