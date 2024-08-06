import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_VARIANT, ODS_INPUT_TYPE, ODS_TEXT_PRESET } from '@ovhcloud/ods-components'
import { OdsButton, OdsDatepicker, OdsFormField, OdsInput, OdsSwitch, OdsSwitchItem, OdsText, OdsTextarea, OdsTimepicker } from '@ovhcloud/ods-components/react'
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
  price: yup.number()
    .min(0, 'Price value should be positive')
    .typeError('Price should be a number')
    .required('Price has to be a positive number'),
  restockDate: yup.date().required('Date has to be set'),
  restockTime: yup.string().required('Title has to be set'),
  title: yup.string().required('Time has to be set'),
})
// TODO add file upload & quantity & select & timepicker
const ProductForm: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, product }) => {
  const formik = useFormik({
    initialValues: product || {
      category: '',
      description: '',
      id: '',
      images: [],
      price: '',
      restockDate: undefined,
      restockTime: undefined,
      thumbnail: '',
      title: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <form className={ styles['product-form'] }
          onSubmit={ formik.handleSubmit }>
      <OdsFormField error={ (formik.touched.title && formik.errors.title) as string }>
        <OdsText preset={ ODS_TEXT_PRESET.label }
                 slot="label">
          Title:
        </OdsText>

        <OdsInput hasError={ formik.touched.title && !!formik.errors.title }
                  name="title"
                  onOdsBlur={ formik.handleBlur }
                  onOdsChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.title } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.price && formik.errors.price) as string }>
        <OdsText preset={ ODS_TEXT_PRESET.label }
                 slot="label">
          Price:
        </OdsText>

        <div className={ styles['product-form__fields__price'] }>
          <OdsInput hasError={ formik.touched.price && !!formik.errors.price }
                    min={ 0 }
                    name="price"
                    onOdsBlur={ formik.handleBlur }
                    onOdsChange={ formik.handleChange }
                    type={ ODS_INPUT_TYPE.number }
                    value={ formik.values.price } />

          <span className={ styles['product-form__fields__price__currency'] }>
            €
          </span>
        </div>
      </OdsFormField>

      <OdsFormField error={ (formik.touched.description && formik.errors.description) as string }>
        <OdsText preset={ ODS_TEXT_PRESET.label }
                 slot="label">
          Description:
        </OdsText>

        <OdsTextarea hasError={ formik.touched.description && !!formik.errors.description ? true : undefined }
                     name="description"
                     onOdsBlur={ formik.handleBlur }
                     onOdsChange={ formik.handleChange }
                     value={ formik.values.description } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.restockDate && formik.errors.restockDate) as string }>
        <OdsText preset={ ODS_TEXT_PRESET.label }
                 slot="label">
          Restock date:
        </OdsText>

        <OdsDatepicker hasError={ formik.touched.restockDate && !!formik.errors.restockDate ? true : undefined }
                       name="restockDate"
                       onOdsBlur={ formik.handleBlur }
                       onOdsChange={ formik.handleChange }
                       value={ formik.values.restockDate } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.restockTime && formik.errors.restockTime) as string }>
        <OdsText preset={ ODS_TEXT_PRESET.label }
                 slot="label">
          Restock time:
        </OdsText>

        <OdsTimepicker hasError={ formik.touched.restockTime && !!formik.errors.restockTime ? true : undefined }
                       name="restockTime"
                       onOdsBlur={ formik.handleBlur }
                       onOdsChange={ formik.handleChange }
                       timezones="all"
                       value={ formik.values.restockTime } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.category && formik.errors.category) as string }>
        <OdsText preset={ ODS_TEXT_PRESET.label }
                 slot="label">
          Category:
        </OdsText>

        <div>
          <OdsSwitch name="category"
                     onOdsBlur={ formik.handleBlur }
                     onOdsChange={ formik.handleChange }>
            <OdsSwitchItem isChecked={ formik.values.category === 'beauty' }
                           value="beauty">
              Beauty
            </OdsSwitchItem>

            <OdsSwitchItem isChecked={ formik.values.category === 'fragrances' }
                           value="fragrances">
              Fragrances
            </OdsSwitchItem>

            <OdsSwitchItem isChecked={ formik.values.category === 'furniture' }
                           value="furniture">
              Furniture
            </OdsSwitchItem>

            <OdsSwitchItem isChecked={ formik.values.category === 'groceries' }
                           value="groceries">
              Groceries
            </OdsSwitchItem>
          </OdsSwitch>
        </div>
      </OdsFormField>

      <div className={ styles['product-form__actions'] }>
        <OdsButton label="Cancel"
                   onClick={ onCancel }
                   type="button"
                   variant={ ODS_BUTTON_VARIANT.outline } />

        <OdsButton isLoading={ isPending }
                   label={ !!product ? 'Update' : 'Create' }
                   type="submit" />
      </div>
    </form>
  )
}

ProductForm.propTypes = propTypes

export { ProductForm }
