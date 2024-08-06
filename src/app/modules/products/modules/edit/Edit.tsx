import type { ProductProps } from 'app/models/Product'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { PageTitle } from 'app/components/pageTitle/PageTitle.tsx'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { ProductForm } from 'app/modules/products/components/productForm/ProductForm'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { Product } from 'app/models/Product'
import { fetch, update } from 'app/state/slices/products'
import styles from './edit.module.scss'

const Edit = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const fetchStatus = useAppSelector((state) => state.products.fetchStatus)
  const product = useAppSelector((state) => state.products.product)
  const updateStatus = useAppSelector((state) => state.products.updateStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10)

      if (fetchStatus === ACTION_STATUS.idle
        || (fetchStatus === ACTION_STATUS.succeeded && product.id !== productId)) {
        dispatch(fetch(productId))
      }
    }
  }, [dispatch, fetchStatus, id])

  useEffect(() => {
    if (isSubmitting && updateStatus === ACTION_STATUS.succeeded) {
      toast.success('Product successfully updated')
      navigate(ROUTE.products)
    }

    if (isSubmitting && updateStatus === ACTION_STATUS.failed) {
      toast.error('Something went wrong while updating the product')
      setIsSubmitting(false)
    }
  }, [isSubmitting, updateStatus])

  function onCancel() {
    navigate(ROUTE.products)
  }

  function onSubmit(product: ProductProps) {
    setIsSubmitting(true)
    dispatch(update(new Product(product)))
  }

  if (fetchStatus !== ACTION_STATUS.succeeded) {
    return <LoadingMask />
  }

  return (
    <div className={ styles.edit }>
      <PageTitle label={ `Edit product "${product.title}"` } />

      <ProductForm isPending={ updateStatus === ACTION_STATUS.pending }
                   onCancel={ onCancel }
                   onSubmit={ onSubmit }
                   product={ product } />
    </div>
  )
}

export { Edit }
export default Edit
