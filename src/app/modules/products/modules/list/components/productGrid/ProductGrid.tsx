import type { OdsCheckboxChangeEvent } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { FC, ReactElement } from 'react'
import type { ProductProps } from 'app/models/Product'
import { OdsCheckbox, OdsMedium, OdsTable } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, ODS_ICON_NAME, OdsButton, OdsIcon, OdsPopover, OdsPopoverContent, OdsPopoverTrigger } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from 'app/constants/navigation'
import { Product } from 'app/models/Product'
import styles from './productGrid.module.scss'

type Column = {
  className?: string,
  customRenderer?: (product: Product) => ReactElement,
  label: string,
  prop: keyof Omit<ProductProps, 'restockDate'>,
}

const propTypes = {
  height: PropTypes.number.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.instanceOf(Product).isRequired).isRequired,
}

const Thumbnail = (product: Product) => (
  <OdsMedium alt={ product.title }
             height={ 60 }
             src={ product.thumbnail }
             width={ 60 } />
)

const COLUMNS: Column[] = [
  { label: 'ID', prop: 'id' },
  { label: 'Product', prop: 'title' },
  { label: 'Price', prop: 'price' },
  {
    className: styles['product-grid__row__thumbnail'],
    customRenderer: Thumbnail,
    label: 'Thumbnail',
    prop: 'thumbnail'
  },
]

const ProductGrid: FC<InferProps<typeof propTypes>> = ({ height, onDeleteProduct, products }) => {
  const navigate = useNavigate()
  const [displayedColumns, setDisplayedColumns] = useState(COLUMNS)

  function onToggleColumn(event: OdsCheckboxChangeEvent, prop: keyof ProductProps) {
    if (event.detail.checked) {
      setDisplayedColumns((prev) => COLUMNS.filter((column => {
        return column.prop === prop || prev.some((c) => c.prop === column.prop)
      })))
    } else {
      setDisplayedColumns((prev) => prev.filter((column) => column.prop !== prop))
    }
  }

  return (
    <OdsTable className={ styles['product-grid'] }
              style={{ height }}>
      <table>
        <thead>
          <tr>
            {
              displayedColumns.map((column) => (
                <th key={ column.prop }
                    scope="col">
                  { column.label }
                </th>
              ))
            }

            <th scope="col">
              <OdsPopover>
                <OdsPopoverTrigger asChild>
                  <OdsButton variant={ ODS_BUTTON_VARIANT.ghost }>
                    <OdsIcon name={ ODS_ICON_NAME.cog } />
                  </OdsButton>
                </OdsPopoverTrigger>

                <OdsPopoverContent>
                  {
                    COLUMNS.map((column) => (
                      <div className={ styles['product-grid__header__action__toggle'] }
                           key={ column.prop }>
                        <OdsCheckbox inputId={ `header-action-toggle-${column.prop}` }
                                     isChecked={ true }
                                     name={ `toggle-${column.prop}` }
                                     onOdsChange={ (e: OdsCheckboxChangeEvent) => onToggleColumn(e, column.prop) } />

                        <label htmlFor={ `header-action-toggle-${column.prop}` }>
                          { column.label }
                        </label>
                      </div>
                    ))
                  }
                </OdsPopoverContent>
              </OdsPopover>
            </th>
          </tr>
        </thead>

        <tbody>
          {
            products.map((product) => (
              <tr key={ product.id }>
                {
                  displayedColumns.map((column) => (
                    <td className={ column.className || '' }
                        key={ column.prop }>
                      {
                        column.customRenderer ?
                          column.customRenderer(product) :
                          product[column.prop]
                      }
                    </td>
                  ))
                }

                <td className={ styles['product-grid__row__actions'] }>
                  <OdsButton onClick={ () => navigate(`${ROUTE.products}/${product.id}/edit`) }
                             variant={ ODS_BUTTON_VARIANT.ghost }>
                    <OdsIcon name={ ODS_ICON_NAME.pen } />
                  </OdsButton>

                  <OdsButton onClick={ () => { onDeleteProduct(product) } }
                             variant={ ODS_BUTTON_VARIANT.ghost }>
                    <OdsIcon name={ ODS_ICON_NAME.trash } />
                  </OdsButton>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </OdsTable>
  )
}

ProductGrid.propTypes = propTypes

export { ProductGrid }
