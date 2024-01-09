import type { OdsPaginationCurrentChangeEvent, OdsPaginationItemPerPageChangedEvent } from '@ovhcloud/ods-components'
import type { ProductGridRow } from 'app/modules/products/modules/list/components/productGrid/ProductGrid'
import { ODS_TEXT_COLOR_INTENT, ODS_TEXT_LEVEL, ODS_TEXT_SIZE } from '@ovhcloud/ods-components'
import { OsdsPagination, OsdsText } from '@ovhcloud/ods-components/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'app/components/link/Link'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
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
  const count = useAppSelector((state) => state.products.count)
  const products = useAppSelector((state) => state.products.products)
  const deleteStatus = useAppSelector((state) => state.products.deleteStatus)
  const listStatus = useAppSelector((state) => state.products.listStatus)
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
  const [totalPages, setTotalPages] = useState(0)
  const [productToDelete, setProductToDelete] = useState<ProductGridRow | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (listStatus === ACTION_STATUS.idle) {
      listProducts(1)
    }
  }, [dispatch, listStatus])

  useEffect(() => {
    setTotalPages(Math.ceil(count / perPage))
  }, [count])

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

  function onDeleteProductClick(product: ProductGridRow) {
    setProductToDelete(product)
  }

  function onDeleteProductSubmit() {
    if (productToDelete) {
      setIsSubmitting(true)
      dispatch(deleteProduct(productToDelete.id))
    }
  }

  function onPaginationChange({ detail }: OdsPaginationCurrentChangeEvent) {
    listProducts(detail.current)
  }

  function onPaginationPerPageChange({ detail }: OdsPaginationItemPerPageChangedEvent) {
    setPerPage(detail.current)
    listProducts(detail.currentPage, detail.current)
  }

  return (
    <div className={ styles.list }>
      <div className={ styles['list__header'] }>
        <OsdsText color={ ODS_TEXT_COLOR_INTENT.primary }
                  level={ ODS_TEXT_LEVEL.heading }
                  size={ ODS_TEXT_SIZE._500 }>
          List of products
        </OsdsText>

        <Link route={ `${ROUTE.products}/new` }>
          Create a new product
        </Link>
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
          <OsdsPagination onOdsPaginationChanged={ onPaginationChange }
                          onOdsPaginationItemPerPageChanged={ onPaginationPerPageChange }
                          totalItems={ count }
                          totalPages={ totalPages } />
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
