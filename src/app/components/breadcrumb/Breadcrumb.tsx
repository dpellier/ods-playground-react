import type { FC } from 'react'
import { OdsBreadcrumb, OdsBreadcrumbItem } from '@ovhcloud/ods-components/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './breadcrumb.module.scss'

type BreadcrumbItem = {
  href: string,
  label: string,
}

const Breadcrumb: FC = () => {
  const location = useLocation()
  const [items, setItems] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean)
    let lastPath = ''

    setItems(pathParts.map((pathPart) => {
      lastPath += `/${pathPart}`

      return {
        href: lastPath,
        label: pathPart,
      }
    }))
  }, [location.pathname])

  return (
    <OdsBreadcrumb className={ styles.breadcrumb }>
      {
        items.map((item) => (
          <OdsBreadcrumbItem className={ styles['breadcrumb__item'] }
                             key={ item.href }
                             href={ item.href }
                             label={ item.label } />
        ))
      }
    </OdsBreadcrumb>
  )
}

export { Breadcrumb }
