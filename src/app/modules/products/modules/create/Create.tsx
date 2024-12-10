import type { ProductProps } from 'app/models/Product'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FORM_SELECTOR_TAB, FormSelector } from 'app/components/formSelector/FormSelector'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import { ROUTE } from 'app/constants/navigation'
import { ACTION_STATUS } from 'app/constants/slice'
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux'
import { Product } from 'app/models/Product'
import { ProductFormFormik } from 'app/modules/products/components/productForm/ProductFormFormik'
import { ProductFormHookForm } from 'app/modules/products/components/productForm/ProductFormHookForm'
import { ProductFormNative } from 'app/modules/products/components/productForm/ProductFormNative'
import { ProductFormTanstackForm } from 'app/modules/products/components/productForm/ProductFormTanstackForm'
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

      <FormSelector isDisabled={ createStatus === ACTION_STATUS.pending }>
        {
          (currentTab) => {
            switch (currentTab) {
              case FORM_SELECTOR_TAB.formik:
                return (
                  <ProductFormFormik isPending={ createStatus === ACTION_STATUS.pending }
                                     onCancel={ onCancel }
                                     onSubmit={ onSubmit } />
                )
              case FORM_SELECTOR_TAB.hookForm:
                return (
                  <ProductFormHookForm isPending={ createStatus === ACTION_STATUS.pending }
                                       onCancel={ onCancel }
                                       onSubmit={ onSubmit } />
                )
              case FORM_SELECTOR_TAB.native:
                return (
                  <ProductFormNative isPending={ createStatus === ACTION_STATUS.pending }
                                     onCancel={ onCancel }
                                     onSubmit={ onSubmit } />
                )
              case FORM_SELECTOR_TAB.tanstackForm:
                return (
                  <ProductFormTanstackForm isPending={ createStatus === ACTION_STATUS.pending }
                                           onCancel={ onCancel }
                                           onSubmit={ onSubmit } />
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

export { Create }
export default Create
