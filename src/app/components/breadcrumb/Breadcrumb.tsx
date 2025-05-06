import type { FC } from 'react'
import { Breadcrumb as OdsBreadcrumb, BreadcrumbItem, BreadcrumbLink } from '@ovhcloud/ods-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'app/components/link/Link'
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
          <BreadcrumbItem className={ styles['breadcrumb__item'] }
                          key={ item.href }>
            <BreadcrumbLink as={ Link }
                            route={ item.href }>
              { item.label }
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))
      }
    </OdsBreadcrumb>
  )
}

export { Breadcrumb }
