import type { InferProps } from 'prop-types'
import type { FC, FormEvent } from 'react'
import { BUTTON_VARIANT, INPUT_TYPE, Button, Checkbox, CheckboxControl, CheckboxLabel, FormField, FormFieldError, FormFieldLabel, Input, Quantity, QuantityControl, QuantityInput, Radio, RadioControl, RadioGroup, RadioLabel, Range, Textarea, Timepicker, TimepickerControl } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Product } from 'app/models/Product'
import styles from './productForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.instanceOf(Product),
}

const ProductFormNative: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, product }) => {
  const [error, setError] = useState<Record<string, string>>({})

  function onFormSubmit(e: FormEvent) {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    onSubmit({
      ...Object.fromEntries(formData.entries()),
      id: product?.id,
    })
  }

  function addError(field: string, errorMessage?: string): void {
    if (errorMessage) {
      setError((error) => ({
        ...error,
        [field]: errorMessage,
      }))
    }
  }

  function onInvalidField(e: FormEvent, field: string): void {
    e.preventDefault()
    updateError(e, field)
  }

  function removeError(field: string): void {
    setError((error) => ({
      ...error,
      [field]: '',
    }))
  }

  function updateError(e: FormEvent, field: string): void {
    const target = e.target as HTMLFormElement;
    if (!target.validity.valid) {
      addError(field, target.validationMessage)
    } else {
      removeError(field)
    }
  }

  return (
    <form className={ styles['product-form'] }
          onSubmit={ onFormSubmit }>
      <FormField invalid={ !!error.title }>
        <FormFieldLabel>
          Title:
        </FormFieldLabel>

        <Input defaultValue={ product?.title }
               id="title"
               name="title"
               required={ true }
               onBlur={ (e) => updateError(e, 'title') }
               onInvalid={ (e) => onInvalidField(e, 'title') } />

        <FormFieldError>
          { error.title }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!error.price }>
        <FormFieldLabel>
          Price:
        </FormFieldLabel>

        <Input defaultValue={ product?.price }
               id="price"
               min={ 0 }
               name="price"
               required={ true }
               onBlur={ (e) => updateError(e, 'price') }
               onInvalid={ (e) => onInvalidField(e, 'price') }
               step="any"
               type={ INPUT_TYPE.number } />

        <FormFieldError>
          { error.price }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!error.description }>
        <FormFieldLabel>
          Description:
        </FormFieldLabel>

        <Textarea defaultValue={ product?.description }
                  id="description"
                  name="description"
                  required={ true }
                  onBlur={ (e) => updateError(e, 'description') }
                  onInvalid={ (e) => onInvalidField(e, 'description') } />

        <FormFieldError>
          { error.description }
        </FormFieldError>
      </FormField>

      <FormField>
        <FormFieldLabel>
          Return policy:
        </FormFieldLabel>

        <Checkbox defaultChecked={ product?.hasReturnPolicy }
                  name="hasReturnPolicy"
                  value="true">
          <CheckboxControl />

          <CheckboxLabel>
            Product can be returned up to 30 days
          </CheckboxLabel>
        </Checkbox>
      </FormField>

      <FormField invalid={ !!error.stock }>
        <FormFieldLabel>
          Stock quantity:
        </FormFieldLabel>

        <Quantity defaultValue={ product?.stock?.toString() }
                  min={ 0 }
                  name="stock"
                  required={ true }
                  onBlur={ (e) => updateError(e, 'stock') }
                  onInvalid={ (e) => onInvalidField(e, 'stock') }>
          <QuantityControl>
            <QuantityInput />
          </QuantityControl>
        </Quantity>
      </FormField>

      <FormField invalid={ !!error.restockTime }>
        <FormFieldLabel>
          Restock time:
        </FormFieldLabel>

        <Timepicker defaultValue={ product?.restockTime }
                    name="restockTime"
                    onBlur={ (e) => updateError(e, 'restockTime') }
                    onInvalid={ (e) => onInvalidField(e, 'restockTime') }
                    required>
          <TimepickerControl />
        </Timepicker>
      </FormField>

      <FormField invalid={ !!error.minimumOrderQuantity }>
        <FormFieldLabel>
          Minimum order quantity:
        </FormFieldLabel>

        <Range defaultValue={ product ? [product.minimumOrderQuantity] : undefined }
               name="minimumOrderQuantity"
               onBlur={ (e) => updateError(e, 'minimumOrderQuantity') }
               onInvalid={ (e) => onInvalidField(e, 'minimumOrderQuantity') } />
      </FormField>

      <FormField invalid={ !!error.category }>
        <FormFieldLabel>
          Category:
        </FormFieldLabel>

        <RadioGroup defaultValue={ product?.category }
                    name="category"
                    onBlur={ (e) => updateError(e, 'category') }
                    onInvalid={ (e) => onInvalidField(e, 'category') }
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

ProductFormNative.propTypes = propTypes

export { ProductFormNative }
