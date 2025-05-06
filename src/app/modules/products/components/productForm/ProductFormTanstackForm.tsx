import type { OdsRangeChangeEvent, OdsTimepickerChangeEvent } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { ChangeEvent, FC } from 'react'
import type { ProductCategory } from 'app/models/Product'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsFormField as OdsFormField, OdsRange, OdsTimepicker } from '@ovhcloud/ods-components/react'
import { BUTTON_VARIANT, Button, Checkbox, CheckboxControl, CheckboxLabel, FormField, FormFieldError, FormFieldLabel, Input, Quantity, QuantityControl, QuantityInput, Radio, RadioControl, RadioGroup, RadioGroupLabel, RadioLabel, Textarea } from '@ovhcloud/ods-react'
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
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Title:
                      </FormFieldLabel>

                      <Input defaultValue={ product?.title || '' }
                             name={ field.name }
                             onBlur={ field.handleBlur }
                             onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value) }
                             type={ ODS_INPUT_TYPE.text } />

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <form.Field name="price"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.price }}
                  children={ (field) => ((
                  <FormField invalid={ !!field.state.meta.errors.length }>
                    <FormFieldLabel>
                      Price:
                    </FormFieldLabel>

                    <div className={ styles['product-form__fields__price'] }>
                      <Input defaultValue={ product?.price }
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

                    <FormFieldError>
                      { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                    </FormFieldError>
                  </FormField>
                  ))} />

      <form.Field name="description"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.description }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Description:
                      </FormFieldLabel>

                      <Textarea defaultValue={ product?.description || '' }
                                name={ field.name }
                                onBlur={ field.handleBlur }
                                onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => field.handleChange(e.target.value) } />

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <form.Field name="hasReturnPolicy"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.hasReturnPolicy }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Return policy:
                      </FormFieldLabel>

                      <Checkbox defaultChecked={ product?.hasReturnPolicy }
                                name={ field.name }
                                onBlur={ field.handleBlur }
                                onCheckedChange={ ({ checked }) => field.handleChange(!!checked) }>
                        <CheckboxControl />

                        <CheckboxLabel>
                          Product can be returned up to 30 days
                        </CheckboxLabel>
                      </Checkbox>

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <form.Field name="stock"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.stock }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Stock quantity:
                      </FormFieldLabel>

                      <Quantity defaultValue={ product?.stock?.toString() }
                                min={ 0 }
                                name={ field.name }
                                onBlur={ field.handleBlur }
                                onValueChange={ ({ valueAsNumber }) => field.handleChange(valueAsNumber) }>
                        <QuantityControl>
                          <QuantityInput />
                        </QuantityControl>
                      </Quantity>
                    </FormField>
                  ))} />

      <form.Field name="restockTime"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.restockTime }}
                  children={ (field) => ((
                    <OdsFormField error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
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
                    </OdsFormField>
                  ))} />

      <form.Field name="minimumOrderQuantity"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.minimumOrderQuantity }}
                  children={ (field) => ((
                    <OdsFormField error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
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
                    </OdsFormField>
                  ))} />

      <form.Field name="category"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.category }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <RadioGroup defaultValue={ product?.category }
                                  onValueChange={ (e) => field.handleChange(e.value as ProductCategory) }
                                  orientation="horizontal">
                        <RadioGroupLabel>
                          Category:
                        </RadioGroupLabel>

                        <Radio invalid={ !!field.state.meta.errors.length }
                               value="beauty">
                          <RadioControl />

                          <RadioLabel>
                            Beauty
                          </RadioLabel>
                        </Radio>

                        <Radio invalid={ !!field.state.meta.errors.length }
                               value="fragrances">
                          <RadioControl />

                          <RadioLabel>
                            Fragrances
                          </RadioLabel>
                        </Radio>

                        <Radio invalid={ !!field.state.meta.errors.length }
                               value="furniture">
                          <RadioControl />

                          <RadioLabel>
                            Furniture
                          </RadioLabel>
                        </Radio>

                        <Radio invalid={ !!field.state.meta.errors.length }
                               value="groceries">
                          <RadioControl />

                          <RadioLabel>
                            Groceries
                          </RadioLabel>
                        </Radio>
                      </RadioGroup>
                    </FormField>
                  ))} />

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

ProductFormTanstackForm.propTypes = propTypes

export { ProductFormTanstackForm }
