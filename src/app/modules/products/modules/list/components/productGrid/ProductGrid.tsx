import type { OdsDatagridColumn } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_SIZE, ODS_BUTTON_VARIANT, ODS_ICON_NAME, ODS_ICON_SIZE } from '@ovhcloud/ods-components'
import { OsdsButton, OsdsDatagrid, OsdsIcon, OsdsMedium } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from 'app/constants/navigation'
import { reactFormatter } from 'app/helpers/datagrid'
import { Product } from 'app/models/Product'
import styles from './productGrid.module.scss'

type ProductGridRow = {
  id: number,
  price: number,
  thumbnail: string,
  title: string
}

const productGridDeleteEvent = 'product-grid-delete-event'
const productGridEditEvent = 'product-grid-edit-event'

const Actions = (props?: { cellData?: string, rowData?: ProductGridRow }) => (
  <div style={{
    display: 'flex',
    flexFlow: 'row',
    gridColumnGap: '.5rem',
    alignItems: 'center',
  }}>
    <OsdsButton onClick={ ()=> {
      const event = new CustomEvent<{productId: number | undefined}>(productGridEditEvent, {
        detail: {
          productId: props?.rowData?.id
        }
      })
      window.dispatchEvent(event)
    }}
                size={ ODS_BUTTON_SIZE.sm }
                variant={ ODS_BUTTON_VARIANT.ghost }>
      <OsdsIcon name={ ODS_ICON_NAME.PEN_CONCEPT }
                size={ ODS_ICON_SIZE.xs } />
    </OsdsButton>

    <OsdsButton onClick={ ()=> {
      const event = new CustomEvent<{product: ProductGridRow | undefined}>(productGridDeleteEvent, {
        detail: {
          product: props?.rowData
        }
      })
      window.dispatchEvent(event)
    }}
                size={ ODS_BUTTON_SIZE.sm }
                variant={ ODS_BUTTON_VARIANT.ghost }>
      <OsdsIcon name={ ODS_ICON_NAME.TRASH_CONCEPT }
                size={ ODS_ICON_SIZE.xs } />
    </OsdsButton>
  </div>
)

const Thumbnail = (props?: { cellData?: string, rowData?: ProductGridRow }) => (
  <OsdsMedium alt={ props?.rowData?.title }
              height={ 60 }
              src={ props?.cellData } />
);

const columns: OdsDatagridColumn[] = [
  { title: 'ID', field: 'id', isSortable: true },
  { title: 'Product', field: 'title', isSortable: true },
  { title: 'Price', field: 'price', isSortable: true },
  {
    title: 'Thumbnail',
    field: 'thumbnail',
    isSortable: false,
    formatter: reactFormatter(<Thumbnail />),
  },
  {
    title: '',
    field: '',
    isSortable: false,
    formatter: reactFormatter(<Actions />),
  },
]

const propTypes = {
  height: PropTypes.number.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.instanceOf(Product).isRequired).isRequired,
}

const ProductGrid: FC<InferProps<typeof propTypes>> = ({ height, onDeleteProduct, products }) => {
  const navigate = useNavigate()
  const [rows, setRows] = useState<ProductGridRow[] | null>(null)

  const onProductDeleteEvent = useCallback((e: CustomEvent) => {
    e.stopPropagation()
    onDeleteProduct(e.detail.product)
  }, [])

  const onProductEditEvent = useCallback((e: CustomEvent) => {
    e.stopPropagation()
    navigate(`${ROUTE.products}/${e.detail.productId}/edit`)
  }, [navigate])

  useEffect(() => {
    setRows(products.map((product) => ({
      id: product.id,
      price: product.price,
      thumbnail: product.thumbnail,
      title: product.title,
    })))
  }, [products])

  useEffect(() => {
    window.addEventListener(productGridDeleteEvent, onProductDeleteEvent as (e: Event) => void)
    window.addEventListener(productGridEditEvent, onProductEditEvent as (e: Event) => void)

    return () => {
      window.removeEventListener(productGridDeleteEvent, onProductDeleteEvent as (e: Event) => void)
      window.removeEventListener(productGridEditEvent, onProductEditEvent as (e: Event) => void)
    }
  }, [onProductDeleteEvent, onProductEditEvent])

  if (!rows) {
    return <></>
  }

  return (
    <OsdsDatagrid className={ styles['product-grid'] }
                  columns={ columns }
                  height={ height }
                  noResultLabel="No products found"
                  rows={ rows }>
    </OsdsDatagrid>
  )
}

ProductGrid.propTypes = propTypes

export type { ProductGridRow }
export { ProductGrid }
