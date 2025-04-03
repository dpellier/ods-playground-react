import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsCheckbox, OdsFormField as OdsFormFieldv18, OdsInput, OdsQuantity, OdsRadio, OdsRange, OdsTimepicker } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton, OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsTextarea } from '@ovhcloud/ods-react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { Product } from 'app/models/Product'
import styles from './productForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.instanceOf(Product),
}

const validationSchema = yup.object({
  category: yup.string().required('Category has to be set'),
  description: yup.string().required('Description has to be set'),
  hasReturnPolicy: yup.bool(),
  minimumOrderQuantity: yup.number()
    .min(0, 'Minimum order quantity value should be positive')
    .typeError('Minimum order quantity should be a number')
    .required('Minimum order quantity has to be a positive number'),
  price: yup.number()
    .min(0, 'Price value should be positive')
    .typeError('Price should be a number')
    .required('Price has to be a positive number'),
  restockTime: yup.string().required('Time has to be set'),
  stock: yup.number()
    .min(0, 'Stock value should be positive')
    .typeError('Stock should be a number')
    .required('Stock has to be a positive number'),
  title: yup.string().required('Title has to be set'),
})

const ProductFormFormik: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, product }) => {
  const formik = useFormik({
    initialValues: product || {
      category: '',
      description: '',
      hasReturnPolicy: false,
      images: [],
      minimumOrderQuantity: null,
      price: '',
      restockTime: undefined,
      stock: null,
      thumbnail: '',
      title: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <form className={ styles['product-form'] }
          onSubmit={ formik.handleSubmit }>
      <OdsFormFieldv18 error={ (formik.touched.title && formik.errors.title) as string }>
        <label className={ styles['product-form__fields__label'] }
               htmlFor="title">
          Title:
        </label>

        <OdsInput hasError={ formik.touched.title && !!formik.errors.title }
                  id="title"
                  name="title"
                  onOdsBlur={ formik.handleBlur }
                  onOdsChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.title } />
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ (formik.touched.price && formik.errors.price) as string }>
        <label className={ styles['product-form__fields__label'] }
               htmlFor="price">
          Price:
        </label>

        <div className={ styles['product-form__fields__price'] }>
          <OdsInput hasError={ formik.touched.price && !!formik.errors.price }
                    id="price"
                    min={ 0 }
                    name="price"
                    onOdsBlur={ formik.handleBlur }
                    onOdsChange={ formik.handleChange }
                    step="any"
                    type={ ODS_INPUT_TYPE.number }
                    value={ formik.values.price } />

          <span className={ styles['product-form__fields__price__currency'] }>
            €
          </span>
        </div>
      </OdsFormFieldv18>

      <OdsFormField invalid={ !!(formik.touched.description && formik.errors.description) }>
        <OdsFormFieldLabel>
          Description:
        </OdsFormFieldLabel>

        <OdsTextarea name="description"
                     onBlur={ formik.handleBlur }
                     onChange={ formik.handleChange }
                     value={ formik.values.description } />

        <OdsFormFieldError>
          { formik.errors.description }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormFieldv18 error={ (formik.touched.hasReturnPolicy && formik.errors.hasReturnPolicy) as string }>
        <label className={ styles['product-form__fields__label'] }>
          Return policy:
        </label>

        <div className={ styles['product-form__fields__return-policy'] }>
          <div className={ styles['product-form__fields__return-policy__option'] }>
            <OdsCheckbox hasError={ formik.touched.hasReturnPolicy && !!formik.errors.hasReturnPolicy }
                         isChecked={ formik.initialValues.hasReturnPolicy }
                         inputId="has-return-policy"
                         name="hasReturnPolicy"
                         onOdsBlur={ formik.handleBlur }
                         onOdsChange={ (e) => {
                           formik.setFieldValue('hasReturnPolicy', e.detail.checked)
                         }} />
            <label htmlFor="has-return-policy">Product can be returned up to 30 days</label>
          </div>
        </div>
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ (formik.touched.stock && formik.errors.stock) as string }>
        <div className={ styles['product-form__fields__stock'] }>
          <label className={ styles['product-form__fields__label'] }
                 htmlFor="stock">
            Stock quantity:
          </label>

          <OdsQuantity hasError={ formik.touched.stock && !!formik.errors.stock ? true : undefined }
                       id="stock"
                       min={ 0 }
                       name="stock"
                       onOdsBlur={ formik.handleBlur }
                       onOdsChange={ formik.handleChange }
                       value={ formik.values.stock } />
        </div>
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ (formik.touched.restockTime && formik.errors.restockTime) as string }>
        <label className={ styles['product-form__fields__label'] }
               htmlFor="restockTime">
          Restock time:
        </label>

        <OdsTimepicker hasError={ formik.touched.restockTime && !!formik.errors.restockTime ? true : undefined }
                       id="restockTime"
                       name="restockTime"
                       onOdsBlur={ formik.handleBlur }
                       onOdsChange={ formik.handleChange }
                       timezones="all"
                       value={ formik.values.restockTime } />
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ (formik.touched.minimumOrderQuantity && formik.errors.minimumOrderQuantity) as string }>
        <label className={ styles['product-form__fields__label'] }
               htmlFor="minimumOrderQuantity">
          Minimum order quantity:
        </label>

        <div>
          <OdsRange hasError={ formik.touched.minimumOrderQuantity && !!formik.errors.minimumOrderQuantity }
                    id="minimumOrderQuantity"
                    name="minimumOrderQuantity"
                    onOdsBlur={ formik.handleBlur }
                    onOdsChange={ formik.handleChange }
                    value={ formik.values.minimumOrderQuantity } />
        </div>
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ (formik.touched.category && formik.errors.category) as string }>
        <label className={ styles['product-form__fields__label'] }>
          Category:
        </label>

        <div className={ styles['product-form__fields__category'] }>
          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio hasError={ formik.touched.category && !!formik.errors.category }
                      isChecked={ formik.initialValues.category === 'beauty' }
                      inputId="category-beauty"
                      name="category"
                      onOdsBlur={ formik.handleBlur }
                      onOdsChange={ (e) => {
                        formik.setFieldValue('category', e.detail.checked ? e.detail.value : null)
                      }}
                      value="beauty" />
            <label htmlFor="category-beauty">Beauty</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio hasError={ formik.touched.category && !!formik.errors.category }
                      isChecked={ formik.initialValues.category === 'fragrances' }
                      inputId="category-fragrances"
                      name="category"
                      onOdsBlur={ formik.handleBlur }
                      onOdsChange={ (e) => {
                        formik.setFieldValue('category', e.detail.checked ? e.detail.value : null)
                      }}
                      value="fragrances" />
            <label htmlFor="category-fragrances">Fragrances</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio hasError={ formik.touched.category && !!formik.errors.category }
                      isChecked={ formik.initialValues.category === 'furniture' }
                      inputId="category-furniture"
                      name="category"
                      onOdsBlur={ formik.handleBlur }
                      onOdsChange={ (e) => {
                        formik.setFieldValue('category', e.detail.checked ? e.detail.value : null)
                      }}
                      value="furniture" />
            <label htmlFor="category-furniture">Furniture</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio hasError={ formik.touched.category && !!formik.errors.category }
                      isChecked={ formik.initialValues.category === 'groceries' }
                      inputId="category-groceries"
                      name="category"
                      onOdsBlur={ formik.handleBlur }
                      onOdsChange={ (e) => {
                        formik.setFieldValue('category', e.detail.checked ? e.detail.value : null)
                      }}
                      value="groceries" />
            <label htmlFor="category-groceries">Groceries</label>
          </div>
        </div>
      </OdsFormFieldv18>

      <div className={ styles['product-form__actions'] }>
        <OdsButton onClick={ onCancel }
                   type="button"
                   variant={ ODS_BUTTON_VARIANT.outline }>
          Cancel
        </OdsButton>

        <OdsButton isLoading={ isPending }
                   type="submit">
          { !!product ? 'Update' : 'Create' }
        </OdsButton>
      </div>
    </form>
  )
}

ProductFormFormik.propTypes = propTypes

export { ProductFormFormik }
