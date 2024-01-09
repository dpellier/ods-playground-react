import { OsdsSpinner } from '@ovhcloud/ods-components/react'
import styles from './loadingMask.module.scss'

const LoadingMask = () => {
  return (
    <div className={ styles['loading-mask'] }>
      <OsdsSpinner className={ styles['loading-mask__spinner'] }
                   inline={ true } />
    </div>
  )
}

export { LoadingMask }
