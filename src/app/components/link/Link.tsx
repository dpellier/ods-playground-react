import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { Link as OdsLink } from '@ovhcloud/ods-react';
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import styles from './link.module.scss'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  route: PropTypes.string.isRequired,
}

const Link: FC<InferProps<typeof propTypes>> = ({ children, className, route }) => {
  return (
    <OdsLink as={ RouterLink }
             className={ classNames(styles.link, className) }
             to={ route }>
      { children }
    </OdsLink>
  )
}

Link.propTypes = propTypes

export { Link }
