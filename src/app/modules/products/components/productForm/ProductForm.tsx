import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_TYPE, ODS_BUTTON_VARIANT, ODS_INPUT_TYPE, ODS_TEXT_SIZE } from '@ovhcloud/ods-components'
import { OsdsButton, OsdsFormField, OsdsInput, OsdsText, OsdsTextarea } from '@ovhcloud/ods-components/react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { LoadingButton } from 'app/components/loadingButton/LoadingButton'
import { Product } from 'app/models/Product'
import styles from './productForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.instanceOf(Product),
}

const validationSchema = yup.object({
  description: yup.string().required('Description has to be set'),
  price: yup.number()
    .min(0, 'Price value should be positive')
    .typeError('Price should be a number')
    .required('Price has to be a positive number'),
  title: yup.string().required('Title has to be set'),
})

const ProductForm: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, product }) => {
  const formik = useFormik({
    initialValues: product || {
      description: '',
      id: '',
      images: [],
      price: '',
      thumbnail: '',
      title: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <form className={ styles['product-form'] }
          onSubmit={ formik.handleSubmit }>
      <OsdsFormField error={ (formik.touched.title && formik.errors.title) as string }>
        <OsdsText slot="label">
          Title:
        </OsdsText>

        <OsdsInput error={ formik.touched.title && !!formik.errors.title }
                   name="title"
                   onOdsInputBlur={ formik.handleBlur }
                   onOdsValueChange={ formik.handleChange }
                   type={ ODS_INPUT_TYPE.text }
                   value={ formik.values.title } />
      </OsdsFormField>

      <OsdsFormField error={ (formik.touched.price && formik.errors.price) as string }>
        <OsdsText slot="label">
          Price:
        </OsdsText>

        <div className={ styles['product-form__fields__price'] }>
          <OsdsInput error={ formik.touched.price && !!formik.errors.price }
                     inline={ true }
                     min={ 0 }
                     name="price"
                     onOdsInputBlur={ formik.handleBlur }
                     onOdsValueChange={ formik.handleChange }
                     type={ ODS_INPUT_TYPE.number }
                     value={ formik.values.price } />

          <OsdsText size={ ODS_TEXT_SIZE._600 }>
            €
          </OsdsText>
        </div>
      </OsdsFormField>

      <OsdsFormField error={ (formik.touched.description && formik.errors.description) as string }>
        <OsdsText slot="label">
          Description:
        </OsdsText>

        <OsdsTextarea error={ formik.touched.description && !!formik.errors.description ? true : undefined }
                      name="description"
                      onOdsBlur={ formik.handleBlur }
                      onOdsValueChange={ formik.handleChange }
                      value={ formik.values.description } />
      </OsdsFormField>

      <div className={ styles['product-form__actions'] }>
        <OsdsButton onClick={ onCancel }
                    type={ ODS_BUTTON_TYPE.button }
                    variant={ ODS_BUTTON_VARIANT.stroked }>
          Cancel
        </OsdsButton>

        <LoadingButton isPending={ isPending }
                       type={ ODS_BUTTON_TYPE.submit }>
          { !!product ? 'Update' : 'Create' }
        </LoadingButton>
      </div>
    </form>
  )
}

ProductForm.propTypes = propTypes

export { ProductForm }
