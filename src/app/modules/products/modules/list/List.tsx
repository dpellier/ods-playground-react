import type { OdsPaginationCurrentChangeEvent, OdsPaginationItemPerPageChangedEvent } from '@ovhcloud/ods-components'
import type { Product } from 'app/models/Product'
import { OdsPagination } from '@ovhcloud/ods-components/react'
import { ICON_NAME, Button, Icon } from '@ovhcloud/ods-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux'
import { DeleteProductModal } from 'app/modules/products/modules/list/components/deleteProductModal/DeleteProductModal'
import { ProductGrid } from 'app/modules/products/modules/list/components/productGrid/ProductGrid'
import { deleteProduct, list } from 'app/state/slices/products'
import styles from './list.module.scss'

const DEFAULT_PER_PAGE = 10

const List = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const count = useAppSelector((state) => state.products.count)
  const products = useAppSelector((state) => state.products.products)
  const deleteStatus = useAppSelector((state) => state.products.deleteStatus)
  const listStatus = useAppSelector((state) => state.products.listStatus)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (listStatus === ACTION_STATUS.idle) {
      listProducts(1)
    }
  }, [dispatch, listStatus])

  useEffect(() => {
    if (isSubmitting && deleteStatus === ACTION_STATUS.succeeded) {
      toast.success('Product successfully deleted')
      setProductToDelete(null)
      setIsSubmitting(false)
      // TODO should list products again but deletion is not actually saved, so it will give back the same results
    }

    if (isSubmitting && deleteStatus === ACTION_STATUS.failed) {
      toast.error('Something went wrong while deleting the product')
      setIsSubmitting(false)
    }
  }, [deleteStatus, isSubmitting])

  function listProducts(page: number, perPage = DEFAULT_PER_PAGE) {
    dispatch(list({ page, perPage }))
  }

  function onCancelDelete() {
    setProductToDelete(null)
  }

  function onDeleteProductClick(product: Product) {
    setProductToDelete(product)
  }

  function onDeleteProductSubmit() {
    if (productToDelete) {
      setIsSubmitting(true)
      dispatch(deleteProduct(productToDelete.id))
    }
  }

  function onPaginationChange({ detail }: OdsPaginationCurrentChangeEvent) {
    listProducts(detail.current, detail.itemPerPage)
  }

  function onPaginationPerPageChange({ detail }: OdsPaginationItemPerPageChangedEvent) {
    listProducts(detail.currentPage, detail.current)
  }

  return (
    <div className={ styles.list }>
      <div className={ styles['list__header'] }>
        <PageTitle label="List of products" />

        <Button onClick={ () => { navigate(`${ROUTE.products}/new`) } }>
          <Icon name={ ICON_NAME.plus } /> Create a new product
        </Button>
      </div>

      <div className={ styles['list__content'] }>
        {
          !!products ?
          <ProductGrid height={ parseInt(styles.datagridHeight, 10) }
                       onDeleteProduct={ onDeleteProductClick }
                       products={ products } /> :
          <div className={ styles['list__content__mask'] }>
            <LoadingMask />
          </div>
        }

        {
          !!count &&
          <OdsPagination onOdsChange={ onPaginationChange }
                         onOdsItemPerPageChange={ onPaginationPerPageChange }
                         totalItems={ count } />
        }
      </div>

      <DeleteProductModal isOpen={ !!productToDelete }
                          isPending={ deleteStatus === ACTION_STATUS.pending }
                          onCancelDelete={ onCancelDelete }
                          onSubmitDelete={ onDeleteProductSubmit }
                          productTitle={ productToDelete?.title || '' } />
    </div>
  )
}

export { List }
export default List
