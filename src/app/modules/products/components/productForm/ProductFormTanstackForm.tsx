import type { OdsQuantityChangeEvent, OdsRadioChangeEvent, OdsRangeChangeEvent, OdsTimepickerChangeEvent } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { ChangeEvent, FC } from 'react'
import type { ProductCategory } from 'app/models/Product'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsFormField as OdsFormFieldv18, OdsQuantity, OdsRadio, OdsRange, OdsTimepicker } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton, OdsCheckbox, OdsCheckboxControl, OdsCheckboxLabel, OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsInput, OdsTextarea } from '@ovhcloud/ods-react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import PropTypes from 'prop-types'
import { z } from 'zod'
import { Product } from 'app/models/Product'
import styles from './productForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.instanceOf(Product),
}

const validationSchema = {
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
}

const ProductFormTanstackForm: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, product }) => {
  const form = useForm({
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
    onSubmit: async ({ value }) => {
      onSubmit(value)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: z.object(validationSchema).passthrough(),
    },
  })

  return (
    <form className={ styles['product-form'] }
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}>
      <form.Field name="title"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.title }}
                  children={ (field) => ((
                    <OdsFormField invalid={ !!field.state.meta.errors.length }>
                      <OdsFormFieldLabel>
                        Title:
                      </OdsFormFieldLabel>

                      <OdsInput defaultValue={ product?.title || '' }
                                name={ field.name }
                                onBlur={ field.handleBlur }
                                onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value) }
                                type={ ODS_INPUT_TYPE.text } />

                      <OdsFormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </OdsFormFieldError>
                    </OdsFormField>
                  ))} />

      <form.Field name="price"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.price }}
                  children={ (field) => ((
                  <OdsFormField invalid={ !!field.state.meta.errors.length }>
                    <OdsFormFieldLabel>
                      Price:
                    </OdsFormFieldLabel>

                    <div className={ styles['product-form__fields__price'] }>
                      <OdsInput defaultValue={ product?.price }
                                min={ 0 }
                                name={ field.name }
                                onBlur={ field.handleBlur }
                                onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(parseInt(e.target.value, 10)) }
                                step="any"
                                type={ ODS_INPUT_TYPE.number } />

                      <span className={ styles['product-form__fields__price__currency'] }>
                        €
                      </span>
                    </div>

                    <OdsFormFieldError>
                      { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                    </OdsFormFieldError>
                  </OdsFormField>
                  ))} />

      <form.Field name="description"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.description }}
                  children={ (field) => ((
                    <OdsFormField invalid={ !!field.state.meta.errors.length }>
                      <OdsFormFieldLabel>
                        Description:
                      </OdsFormFieldLabel>

                      <OdsTextarea defaultValue={ product?.description || '' }
                                   name={ field.name }
                                   onBlur={ field.handleBlur }
                                   onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => field.handleChange(e.target.value) } />

                      <OdsFormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </OdsFormFieldError>
                    </OdsFormField>
                  ))} />

      <form.Field name="hasReturnPolicy"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.hasReturnPolicy }}
                  children={ (field) => ((
                    <OdsFormField invalid={ !!field.state.meta.errors.length }>
                      <OdsFormFieldLabel>
                        Return policy:
                      </OdsFormFieldLabel>

                      <OdsCheckbox defaultChecked={ product?.hasReturnPolicy }
                                   name={ field.name }
                                   onBlur={ field.handleBlur }
                                   onCheckedChange={ ({ checked }) => field.handleChange(!!checked) }>
                        <OdsCheckboxControl />

                        <OdsCheckboxLabel>
                          Product can be returned up to 30 days
                        </OdsCheckboxLabel>
                      </OdsCheckbox>

                      <OdsFormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </OdsFormFieldError>
                    </OdsFormField>
                  ))} />

      <form.Field name="stock"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.stock }}
                  children={ (field) => ((
                    <OdsFormFieldv18 error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
                      <div className={ styles['product-form__fields__stock'] }>
                        <label className={ styles['product-form__fields__label'] }
                               htmlFor={ field.name }>
                          Stock quantity:
                        </label>

                        <OdsQuantity defaultValue={ product?.stock }
                                     hasError={ !!field.state.meta.errors.length }
                                     id={ field.name }
                                     min={ 0 }
                                     name={ field.name }
                                     onOdsBlur={ field.handleBlur }
                                     // @ts-ignore to look later
                                     onOdsChange={ (e: OdsQuantityChangeEvent) => field.handleChange(e.detail.value) } />
                      </div>
                    </OdsFormFieldv18>
                  ))} />

      <form.Field name="restockTime"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.restockTime }}
                  children={ (field) => ((
                    <OdsFormFieldv18 error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
                      <label className={ styles['product-form__fields__label'] }
                             htmlFor={ field.name }>
                        Restock time:
                      </label>

                      <OdsTimepicker defaultValue={ product?.restockTime || '' }
                                     hasError={ !!field.state.meta.errors.length }
                                     id={ field.name }
                                     name={ field.name }
                                     onOdsBlur={ field.handleBlur }
                                     onOdsChange={ (e: OdsTimepickerChangeEvent) => field.handleChange(e.detail.value as string || '') }
                                     timezones="all" />
                    </OdsFormFieldv18>
                  ))} />

      <form.Field name="minimumOrderQuantity"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.minimumOrderQuantity }}
                  children={ (field) => ((
                    <OdsFormFieldv18 error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
                      <label className={ styles['product-form__fields__label'] }
                             htmlFor={ field.name }>
                        Minimum order quantity:
                      </label>

                      <div>
                        <OdsRange defaultValue={ product?.minimumOrderQuantity }
                                  hasError={ !!field.state.meta.errors.length }
                                  id={ field.name }
                                  name={ field.name }
                                  onOdsBlur={ field.handleBlur }
                                  // @ts-ignore to look later
                                  onOdsChange={ (e: OdsRangeChangeEvent) => field.handleChange(e.detail.value) } />
                      </div>
                    </OdsFormFieldv18>
                  ))} />

      <form.Field name="category"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.category }}
                  children={ (field) => ((
                    <OdsFormFieldv18 error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
                      <label className={ styles['product-form__fields__label'] }>
                        Category:
                      </label>

                      <div className={ styles['product-form__fields__category'] }>
                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!field.state.meta.errors.length }
                                    isChecked={ product?.category === 'beauty' }
                                    inputId="category-beauty"
                                    name={ field.name }
                                    onOdsBlur={ field.handleBlur }
                                    onOdsChange={ (e: OdsRadioChangeEvent) => {
                                      if (e.detail.checked) {
                                        field.handleChange(e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="beauty" />
                          <label htmlFor="category-beauty">Beauty</label>
                        </div>

                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!field.state.meta.errors.length }
                                    isChecked={ product?.category === 'fragrances' }
                                    inputId="category-fragrances"
                                    name={ field.name }
                                    onOdsBlur={ field.handleBlur }
                                    onOdsChange={ (e: OdsRadioChangeEvent) => {
                                      if (e.detail.checked) {
                                        field.handleChange(e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="fragrances" />
                          <label htmlFor="category-fragrances">Fragrances</label>
                        </div>

                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!field.state.meta.errors.length }
                                    isChecked={ product?.category === 'furniture' }
                                    inputId="category-furniture"
                                    name={ field.name }
                                    onOdsBlur={ field.handleBlur }
                                    onOdsChange={ (e: OdsRadioChangeEvent) => {
                                      if (e.detail.checked) {
                                        field.handleChange(e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="furniture" />
                          <label htmlFor="category-furniture">Furniture</label>
                        </div>

                        <div className={ styles['product-form__fields__category__option'] }>
                          <OdsRadio hasError={ !!field.state.meta.errors.length }
                                    isChecked={ product?.category === 'groceries' }
                                    inputId="category-groceries"
                                    name={ field.name }
                                    onOdsBlur={ field.handleBlur }
                                    onOdsChange={ (e: OdsRadioChangeEvent) => {
                                      if (e.detail.checked) {
                                        field.handleChange(e.detail.value as ProductCategory)
                                      }
                                    }}
                                    value="groceries" />
                          <label htmlFor="category-groceries">Groceries</label>
                        </div>
                      </div>
                    </OdsFormFieldv18>
                  ))} />

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

ProductFormTanstackForm.propTypes = propTypes

export { ProductFormTanstackForm }
