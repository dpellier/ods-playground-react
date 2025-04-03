import { OdsSpinner } from '@ovhcloud/ods-react'
import styles from './loadingMask.module.scss'

const LoadingMask = () => {
  return (
    <div className={ styles['loading-mask'] }>
      <OdsSpinner className={ styles['loading-mask__spinner'] } />
    </div>
  )
}

export { LoadingMask }
