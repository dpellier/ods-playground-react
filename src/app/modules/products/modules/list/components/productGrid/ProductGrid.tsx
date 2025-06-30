import type { InferProps } from 'prop-types'
import type { FC, ReactElement } from 'react'
import type { ProductProps } from 'app/models/Product'
import { BUTTON_VARIANT, ICON_NAME, POPOVER_POSITION, Button, Checkbox, CheckboxControl, CheckboxLabel, Icon, Medium, Popover, PopoverContent, PopoverTrigger, Table } from '@ovhcloud/ods-react'
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
  <Medium alt={ product.title }
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

  function onToggleColumn(checked: boolean | string, prop: keyof ProductProps) {
    if (checked) {
      setDisplayedColumns((prev) => COLUMNS.filter((column => {
        return column.prop === prop || prev.some((c) => c.prop === column.prop)
      })))
    } else {
      setDisplayedColumns((prev) => prev.filter((column) => column.prop !== prop))
    }
  }

  return (
    <Table style={{ height }}>
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
            <Popover position={ POPOVER_POSITION.bottom }>
              <PopoverTrigger asChild>
                <Button variant={ BUTTON_VARIANT.ghost }>
                  <Icon name={ ICON_NAME.cog } />
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                {
                  COLUMNS.map((column) => (
                  <Checkbox defaultChecked={ true }
                            key={ column.prop }
                            onCheckedChange={ (e) => onToggleColumn(e.checked, column.prop) }>
                      <CheckboxControl />

                      <CheckboxLabel>
                        { column.label }
                      </CheckboxLabel>
                    </Checkbox>
                  ))
                }
              </PopoverContent>
            </Popover>
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
                <Button onClick={ () => navigate(`${ROUTE.products}/${product.id}/edit`) }
                        variant={ BUTTON_VARIANT.ghost }>
                  <Icon name={ ICON_NAME.pen } />
                </Button>

                <Button onClick={ () => { onDeleteProduct(product) } }
                        variant={ BUTTON_VARIANT.ghost }>
                  <Icon name={ ICON_NAME.trash } />
                </Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

ProductGrid.propTypes = propTypes

export { ProductGrid }
