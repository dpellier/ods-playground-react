import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { BUTTON_VARIANT, INPUT_TYPE, Button, Checkbox, CheckboxControl, CheckboxLabel, FormField, FormFieldError, FormFieldLabel, Input, Quantity, QuantityControl, QuantityInput, Radio, RadioControl, RadioGroup, RadioLabel, Range, Textarea, Timepicker, TimepickerControl } from '@ovhcloud/ods-react'
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
      <FormField invalid={ !!(formik.touched.title && formik.errors.title) }>
        <FormFieldLabel>
          Title:
        </FormFieldLabel>

        <Input name="title"
               onBlur={ formik.handleBlur }
               onChange={ formik.handleChange }
               value={ formik.values.title } />

        <FormFieldError>
          { formik.errors.title }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.price && formik.errors.price) }>
        <FormFieldLabel>
          Price:
        </FormFieldLabel>

        <Input min={ 0 }
               name="price"
               onBlur={ formik.handleBlur }
               onChange={ formik.handleChange }
               step="any"
               type={ INPUT_TYPE.number }
               value={ formik.values.price } />

        <FormFieldError>
          { formik.errors.price }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.description && formik.errors.description) }>
        <FormFieldLabel>
          Description:
        </FormFieldLabel>

        <Textarea name="description"
                  onBlur={ formik.handleBlur }
                  onChange={ formik.handleChange }
                  value={ formik.values.description } />

        <FormFieldError>
          { formik.errors.description }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.hasReturnPolicy && formik.errors.hasReturnPolicy) }>
        <FormFieldLabel>
          Return policy:
        </FormFieldLabel>

        <Checkbox defaultChecked={ formik.initialValues.hasReturnPolicy }
                  name="hasReturnPolicy"
                  onBlur={ formik.handleBlur }
                  onChange={ formik.handleChange }
                  onCheckedChange={ ({ checked }) => formik.setFieldValue('hasReturnPolicy', checked) }>
          <CheckboxControl />

          <CheckboxLabel>
            Product can be returned up to 30 days
          </CheckboxLabel>
        </Checkbox>

        <FormFieldError>
          { formik.errors.description }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.stock && formik.errors.stock) }>
        <FormFieldLabel>
          Stock quantity:
        </FormFieldLabel>

        <Quantity min={ 0 }
                  name="stock"
                  onBlur={ formik.handleBlur }
                  onValueChange={ ({ value }) => {
                    formik.setFieldValue('stock', value);
                  }}
                  value={ formik.values.stock?.toString() }>
          <QuantityControl>
            <QuantityInput />
          </QuantityControl>
        </Quantity>
      </FormField>

      <FormField invalid={ !!(formik.touched.restockTime && formik.errors.restockTime) }>
        <FormFieldLabel>
          Restock time:
        </FormFieldLabel>

        <Timepicker name="restockTime"
                    onBlur={ formik.handleBlur }
                    onValueChange={ ({ value }) => {
                      formik.setFieldValue('restockTime', value);
                    }}
                    value={ formik.values.restockTime }>
          <TimepickerControl />
        </Timepicker>
      </FormField>

      <FormField invalid={ !!(formik.touched.minimumOrderQuantity && formik.errors.minimumOrderQuantity) }>
        <FormFieldLabel>
          Minimum order quantity:
        </FormFieldLabel>

        <Range name="minimumOrderQuantity"
               onBlur={ formik.handleBlur }
               onValueChange={ ({ value }) => {
                 formik.setFieldValue('minimumOrderQuantity', value[0]);
               }}
               value={ formik.values.minimumOrderQuantity ? [formik.values.minimumOrderQuantity] : undefined } />
      </FormField>

      <FormField invalid={ !!(formik.touched.category && formik.errors.category) }>
        <FormFieldLabel>
          Category:
        </FormFieldLabel>

        <RadioGroup defaultValue={ formik.initialValues.category }
                    name="category"
                    onBlur={ formik.handleBlur }
                    onValueChange={ ({ value }) => {
                      formik.setFieldValue('category', value);
                    }}
                    orientation="horizontal">
          <Radio value="beauty">
            <RadioControl />
            <RadioLabel>
              Beauty
            </RadioLabel>
          </Radio>

          <Radio value="fragrances">
            <RadioControl />
            <RadioLabel>
              Fragrances
            </RadioLabel>
          </Radio>

          <Radio value="furniture">
            <RadioControl />
            <RadioLabel>
              Furniture
            </RadioLabel>
          </Radio>

          <Radio value="groceries">
            <RadioControl />
            <RadioLabel>
              Groceries
            </RadioLabel>
          </Radio>
        </RadioGroup>
      </FormField>

      <div className={ styles['product-form__actions'] }>
        <Button onClick={ onCancel }
                type="button"
                variant={ BUTTON_VARIANT.outline }>
          Cancel
        </Button>

        <Button loading={ isPending }
                type="submit">
          { !!product ? 'Update' : 'Create' }
        </Button>
      </div>
    </form>
  )
}

ProductFormFormik.propTypes = propTypes

export { ProductFormFormik }
