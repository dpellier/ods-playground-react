import type { ProductProps } from 'app/models/Product'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { PageTitle } from 'app/components/pageTitle/PageTitle.tsx'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { ProductForm } from 'app/modules/products/components/productForm/ProductForm'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { Product } from 'app/models/Product'
import { create } from 'app/state/slices/products'
import styles from './create.module.scss'

const Create = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const createStatus = useAppSelector((state) => state.products.createStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting && createStatus === ACTION_STATUS.succeeded) {
      toast.success('Product successfully created')
      navigate(ROUTE.products)
    }

    if (isSubmitting && createStatus === ACTION_STATUS.failed) {
      toast.error('Something went wrong while saving the product')
      setIsSubmitting(false)
    }
  }, [isSubmitting, createStatus])

  function onCancel() {
    navigate(ROUTE.products)
  }

  function onSubmit(product: ProductProps) {
    setIsSubmitting(true)
    dispatch(create(new Product(product)))
  }

  return (
    <div className={ styles.create }>
      <PageTitle label="New product" />

      <ProductForm isPending={ createStatus === ACTION_STATUS.pending }
                   onCancel={ onCancel }
                   onSubmit={ onSubmit } />
    </div>
  )
}

export { Create }
export default Create
