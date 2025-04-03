import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link as LinkVendor } from 'react-router-dom'
import styles from './link.module.scss'

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
}

const Link: FC<InferProps<typeof propTypes>> = ({ className, label, route }) => {
  return (
    <LinkVendor className={ classNames(styles.link, className) }
                to={ route }>
      { label }
    </LinkVendor>
  )
}

Link.propTypes = propTypes

export { Link }
