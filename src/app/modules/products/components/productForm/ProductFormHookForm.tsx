import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import type { ProductCategory } from 'app/models/Product'
import { zodResolver } from '@hookform/resolvers/zod'
import { BUTTON_VARIANT, INPUT_TYPE, Button, Checkbox, CheckboxControl, CheckboxLabel, FormField, FormFieldError, FormFieldLabel, Input, Quantity, QuantityControl, QuantityInput, Radio, RadioControl, RadioGroup, RadioLabel, Range, Textarea, Timepicker, TimepickerControl } from '@ovhcloud/ods-react'
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
      <FormField invalid={ !!errors.title }>
        <FormFieldLabel>
          Title:
        </FormFieldLabel>

        <Input { ...register('title') } />

        <FormFieldError>
          { errors.title?.message }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!errors.price }>
        <FormFieldLabel>
          Price:
        </FormFieldLabel>

        <Input { ...register('price', { valueAsNumber: true }) }
               min={ 0 }
               step="any"
               type={ INPUT_TYPE.number } />

        <FormFieldError>
          { errors.price?.message }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!errors.description }>
        <FormFieldLabel>
          Description:
        </FormFieldLabel>

        <Textarea { ...register('description') } />

        <FormFieldError>
          { errors.description?.message }
        </FormFieldError>
      </FormField>

      <Controller control={ control }
                  name="hasReturnPolicy"
                  render={({ field }) =>
                    <FormField invalid={ !!errors.hasReturnPolicy }>
                      <FormFieldLabel>
                        Return policy:
                      </FormFieldLabel>

                      <Checkbox defaultChecked={ product?.hasReturnPolicy }
                                name={ field.name }
                                onBlur={ field.onBlur }
                                onCheckedChange={ ({ checked }) => setValue(field.name, !!checked) }
                                value="true">
                        <CheckboxControl />

                        <CheckboxLabel>
                          Product can be returned up to 30 days
                        </CheckboxLabel>
                      </Checkbox>

                      <FormFieldError>
                        { errors.hasReturnPolicy?.message }
                      </FormFieldError>
                    </FormField>
                  }/>

      <Controller control={ control }
                  name="stock"
                  render={({ field }) =>
                    <FormField invalid={ !!errors.stock }>
                      <FormFieldLabel>
                        Stock quantity:
                      </FormFieldLabel>

                      <Quantity defaultValue={ product?.stock?.toString() }
                                min={ 0 }
                                name={ field.name }
                                onBlur={ field.onBlur }
                                onValueChange={ ({ valueAsNumber }) => setValue(field.name, valueAsNumber) }>
                        <QuantityControl>
                          <QuantityInput />
                        </QuantityControl>
                      </Quantity>

                      <FormFieldError>
                        { errors.stock?.message }
                      </FormFieldError>
                    </FormField>
                  } />

      <Controller control={ control }
                  name="restockTime"
                  render={({ field }) =>
                    <FormField invalid={ !!errors.restockTime }>
                      <FormFieldLabel>
                        Restock time:
                      </FormFieldLabel>

                      <Timepicker defaultValue={ product?.restockTime }
                                  name={ field.name }
                                  onBlur={ field.onBlur }
                                  onValueChange={ ({ value }) => setValue(field.name, value) }>
                        <TimepickerControl />
                      </Timepicker>
                    </FormField>
                  } />

      <Controller control={ control }
                  name="minimumOrderQuantity"
                  render={({ field }) =>
                    <FormField invalid={ !!errors.minimumOrderQuantity }>
                      <FormFieldLabel>
                        Minimum order quantity:
                      </FormFieldLabel>

                      <Range defaultValue={ product ? [product.minimumOrderQuantity] : undefined }
                             name={ field.name }
                             onBlur={ field.onBlur }
                             onValueChange={ ({ value }) => setValue(field.name, value[0]) } />
                    </FormField>
                  } />

      <Controller control={ control }
                  name="category"
                  render={ ({ field} ) => (
                    <FormField>
                      <FormFieldLabel>
                        Category:
                      </FormFieldLabel>

                      <RadioGroup defaultValue={ product?.category }
                                  onValueChange={ ({ value }) => value && setValue(field.name, value as ProductCategory) }
                                  orientation="horizontal">
                        <Radio invalid={ !!errors.category }
                               value="beauty">
                          <RadioControl />

                          <RadioLabel>
                            Beauty
                          </RadioLabel>
                        </Radio>

                        <Radio invalid={ !!errors.category }
                               value="fragrances">
                          <RadioControl />

                          <RadioLabel>
                            Fragrances
                          </RadioLabel>
                        </Radio>

                        <Radio invalid={ !!errors.category }
                               value="furniture">
                          <RadioControl />

                          <RadioLabel>
                            Furniture
                          </RadioLabel>
                        </Radio>

                        <Radio invalid={ !!errors.category }
                               value="groceries">
                          <RadioControl />

                          <RadioLabel>
                            Groceries
                          </RadioLabel>
                        </Radio>
                      </RadioGroup>

                      <FormFieldError>
                        { errors.category?.message }
                      </FormFieldError>
                    </FormField>
        )} />

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

ProductFormHookForm.propTypes = propTypes

export { ProductFormHookForm }
