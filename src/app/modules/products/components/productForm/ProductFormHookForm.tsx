import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import type { ProductCategory } from 'app/models/Product'
import { zodResolver } from '@hookform/resolvers/zod'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsCheckbox, OdsFormField as OdsFormFieldv18, OdsInput, OdsQuantity, OdsRadio, OdsRange, OdsTimepicker } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton, OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsTextarea } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Product } from 'app/models/Product'
import styles from './productForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.instanceOf(Product),
}

const validationSchema = z.object({
  category: z.string({ required_error: 'Category has to be set' }).min(1, { message: 'Category has to be set' }),
  description: z.string().min(1, { message: 'Description has to be set' }),
  hasReturnPolicy: z.boolean(),
  minimumOrderQuantity: z.number({ invalid_type_error: 'Minimum order quantity should be a number' })
    .min(0, { message: 'Minimum order quantity value should be positive' }),
  price: z.number({ invalid_type_error: 'Price should be a number' })
    .min(0, { message: 'Price value should be positive' }),
  restockTime: z.string().min(1, { message: 'Time has to be set' }),
  stock: z.number({ invalid_type_error: 'Stock should be a number' })
    .min(0, { message: 'Stock value should be positive' }),
  title: z.string().min(1, { message: 'Title has to be set' }),
}).passthrough()

const ProductFormHookForm: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, product }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: product || {
      category: undefined,
      description: '',
      hasReturnPolicy: false,
      images: [],
      minimumOrderQuantity: undefined,
      price: undefined,
      restockTime: undefined,
      stock: undefined,
      thumbnail: '',
      title: '',
    },
    resolver: zodResolver(validationSchema),
  })

  return (
    <form className={ styles['product-form'] }
          onSubmit={ handleSubmit(onSubmit) }>
      <Controller control={ control }
                  name="title"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
                      <label className={ styles['product-form__fields__label'] }
                             htmlFor={ field.name }>
                        Title:
                      </label>

                      <OdsInput defaultValue={ product?.title || '' }
                                hasError={ !!fieldState.error }
                                id={ field.name }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                type={ ODS_INPUT_TYPE.text } />
                    </OdsFormFieldv18>
                  } />

      <Controller control={ control }
                name="price"
                render={({ field, fieldState }) =>
                  <OdsFormFieldv18 error={ fieldState.error?.message }>
                    <label className={ styles['product-form__fields__label'] }
                           htmlFor={ field.name }>
                      Price:
                    </label>

                    <div className={ styles['product-form__fields__price'] }>
                      <OdsInput defaultValue={ product?.price }
                                hasError={ !!fieldState.error }
                                id={ field.name }
                                min={ 0 }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                step="any"
                                type={ ODS_INPUT_TYPE.number } />

                      <span className={ styles['product-form__fields__price__currency'] }>
                        €
                      </span>
                    </div>
                  </OdsFormFieldv18>
                } />

      <OdsFormField invalid={ !!errors.description }>
        <OdsFormFieldLabel>
          Description:
        </OdsFormFieldLabel>

        <OdsTextarea { ...register('description') } />

        <OdsFormFieldError>
          { errors.description?.message }
        </OdsFormFieldError>
      </OdsFormField>

      <Controller control={ control }
                  name="hasReturnPolicy"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
                      <label className={ styles['product-form__fields__label'] }>
                        Return policy:
                      </label>

                      <div className={ styles['product-form__fields__return-policy'] }>
                        <div className={ styles['product-form__fields__return-policy__option'] }>
                          <OdsCheckbox hasError={ !!fieldState.error }
                                       isChecked={ product?.hasReturnPolicy }
                                       inputId="has-return-policy"
                                       name={ field.name }
                                       onOdsBlur={ field.onBlur }
                                       onOdsChange={ (e) => {
                                         setValue(field.name, e.detail.checked)
                                       }} />
                          <label htmlFor="has-return-policy">Product can be returned up to 30 days</label>
                        </div>
                      </div>
                    </OdsFormFieldv18>
                  } />

      <Controller control={ control }
                  name="stock"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
                      <div className={ styles['product-form__fields__stock'] }>
                        <label className={ styles['product-form__fields__label'] }
                               htmlFor={ field.name }>
                          Stock quantity:
                        </label>

                        <OdsQuantity defaultValue={ product?.stock }
                                     hasError={ !!fieldState.error }
                                     id={ field.name }
                                     min={ 0 }
                                     name={ field.name }
                                     onOdsBlur={ field.onBlur }
                                     onOdsChange={ field.onChange } />
                      </div>
                    </OdsFormFieldv18>
                  } />

      <Controller control={ control }
                  name="restockTime"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
                      <label className={ styles['product-form__fields__label'] }
                             htmlFor={ field.name }>
                        Restock time:
                      </label>

                      <OdsTimepicker defaultValue={ product?.restockTime || '' }
                                     hasError={ !!fieldState.error }
                                     id={ field.name }
                                     name={ field.name }
                                     onOdsBlur={ field.onBlur }
                                     onOdsChange={ field.onChange }
                                     timezones="all" />
                    </OdsFormFieldv18>
                  } />

      <Controller control={ control }
                  name="minimumOrderQuantity"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
                      <label className={ styles['product-form__fields__label'] }
                             htmlFor={ field.name }>
                        Minimum order quantity:
                      </label>

                      <div>
                        <OdsRange defaultValue={ product?.minimumOrderQuantity }
                                  hasError={ !!fieldState.error }
                                  id={ field.name }
                                  name={ field.name }
                                  onOdsBlur={ field.onBlur }
                                  onOdsChange={ field.onChange } />
                      </div>
                    </OdsFormFieldv18>
                  } />

      <Controller control={ control }
                  name="category"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
                      <label className={ styles['product-form__fields__label'] }>
                        Category:
                      </label>

                      <div className={ styles['product-form__fields__category'] }>
                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!fieldState.error }
                                    isChecked={ product?.category === 'beauty' }
                                    inputId="category-beauty"
                                    name={ field.name }
                                    onOdsBlur={ field.onBlur }
                                    onOdsChange={ (e) => {
                                      if (e.detail.checked) {
                                        setValue(field.name, e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="beauty" />
                          <label htmlFor="category-beauty">Beauty</label>
                        </div>

                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!fieldState.error }
                                    isChecked={ product?.category === 'fragrances' }
                                    inputId="category-fragrances"
                                    name={ field.name }
                                    onOdsBlur={ field.onBlur }
                                    onOdsChange={ (e) => {
                                      if (e.detail.checked) {
                                        setValue(field.name, e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="fragrances" />
                          <label htmlFor="category-fragrances">Fragrances</label>
                        </div>

                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!fieldState.error }
                                    isChecked={ product?.category === 'furniture' }
                                    inputId="category-furniture"
                                    name={ field.name }
                                    onOdsBlur={ field.onBlur }
                                    onOdsChange={ (e) => {
                                      if (e.detail.checked) {
                                        setValue(field.name, e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="furniture" />
                          <label htmlFor="category-furniture">Furniture</label>
                        </div>

                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!fieldState.error }
                                    isChecked={ product?.category === 'groceries' }
                                    inputId="category-groceries"
                                    name={ field.name }
                                    onOdsBlur={ field.onBlur }
                                    onOdsChange={ (e) => {
                                      if (e.detail.checked) {
                                        setValue(field.name, e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="groceries" />
                          <label htmlFor="category-groceries">Groceries</label>
                        </div>
                      </div>
                    </OdsFormFieldv18>
                  } />

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

ProductFormHookForm.propTypes = propTypes

export { ProductFormHookForm }
