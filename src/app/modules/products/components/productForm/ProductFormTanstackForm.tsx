import type { InferProps } from 'prop-types'
import type { ChangeEvent, FC } from 'react'
import type { ProductCategory } from 'app/models/Product'
import { BUTTON_VARIANT, INPUT_TYPE, Button, Checkbox, CheckboxControl, CheckboxLabel, FormField, FormFieldError, FormFieldLabel, Input, Quantity, QuantityControl, QuantityInput, Radio, RadioControl, RadioGroup, RadioLabel, Range, Textarea, Timepicker, TimepickerControl } from '@ovhcloud/ods-react'
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
                             type={ INPUT_TYPE.text } />

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

                    <Input defaultValue={ product?.price }
                           min={ 0 }
                           name={ field.name }
                           onBlur={ field.handleBlur }
                           onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(parseInt(e.target.value, 10)) }
                           step="any"
                           type={ INPUT_TYPE.number } />

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
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Restock time:
                      </FormFieldLabel>

                      <Timepicker defaultValue={ product?.restockTime || '' }
                                  name={ field.name }
                                  onBlur={ field.handleBlur }
                                  onValueChange={ ({ value }) => field.handleChange(value) }>
                        <TimepickerControl />
                      </Timepicker>
                    </FormField>
                  ))} />

      <form.Field name="minimumOrderQuantity"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.minimumOrderQuantity }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Minimum order quantity:
                      </FormFieldLabel>

                      <Range defaultValue={ product ? [product.minimumOrderQuantity] : undefined }
                             name={ field.name }
                             onBlur={ field.handleBlur }
                             onValueChange={ ({ value }) => field.handleChange(value[0]) } />
                    </FormField>
                  ))} />

      <form.Field name="category"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.category }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Category:
                      </FormFieldLabel>

                      <RadioGroup defaultValue={ product?.category }
                                  onValueChange={ (e) => field.handleChange(e.value as ProductCategory) }
                                  orientation="horizontal">
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
