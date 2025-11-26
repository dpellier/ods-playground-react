import type { ProductProps } from 'app/models/Product'
import { toast } from '@ovhcloud/ods-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FORM_SELECTOR_TAB, FormSelector } from 'app/components/formSelector/FormSelector'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { Product } from 'app/models/Product'
import { ProductFormFormik } from 'app/modules/products/components/productForm/ProductFormFormik'
import { ProductFormHookForm } from 'app/modules/products/components/productForm/ProductFormHookForm'
import { ProductFormNative } from 'app/modules/products/components/productForm/ProductFormNative'
import { ProductFormTanstackForm } from 'app/modules/products/components/productForm/ProductFormTanstackForm'
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
      toast.critical('Something went wrong while updating the product')
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

      <FormSelector isDisabled={ updateStatus === ACTION_STATUS.pending }>
        {
          (currentTab) => {
            switch (currentTab) {
              case FORM_SELECTOR_TAB.formik:
                return (
                  <ProductFormFormik isPending={ updateStatus === ACTION_STATUS.pending }
                                     onCancel={ onCancel }
                                     onSubmit={ onSubmit }
                                     product={ product } />
                )
              case FORM_SELECTOR_TAB.hookForm:
                return (
                  <ProductFormHookForm isPending={ updateStatus === ACTION_STATUS.pending }
                                       onCancel={ onCancel }
                                       onSubmit={ onSubmit }
                                       product={ product } />
                )
              case FORM_SELECTOR_TAB.native:
                return (
                  <ProductFormNative isPending={ updateStatus === ACTION_STATUS.pending }
                                     onCancel={ onCancel }
                                     onSubmit={ onSubmit }
                                     product={ product } />
                )
              case FORM_SELECTOR_TAB.tanstackForm:
                return (
                  <ProductFormTanstackForm isPending={ updateStatus === ACTION_STATUS.pending }
                                           onCancel={ onCancel }
                                           onSubmit={ onSubmit }
                                           product={ product } />
                )
              default:
                return ''
            }
          }
        }
      </FormSelector>
    </div>
  )
}

export { Edit }
export default Edit
