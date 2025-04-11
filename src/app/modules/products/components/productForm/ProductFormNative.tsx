import type { OdsFormElement } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { FC, FormEvent } from 'react'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsFormField as OdsFormFieldv18, OdsQuantity, OdsRadio, OdsRange, OdsTimepicker } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton, OdsCheckbox, OdsCheckboxControl, OdsCheckboxLabel, OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsInput, OdsTextarea } from '@ovhcloud/ods-react'
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

  async function updateErrorv18(e: CustomEvent, field: string): Promise<void> {
    if (e.detail.isInvalid) {
      const errorMessage = await (e.target as HTMLElement & OdsFormElement).getValidationMessage()
      addError(field, errorMessage)
    } else {
      removeError(field)
    }
  }

  return (
    <form className={ styles['product-form'] }
          onSubmit={ onFormSubmit }>
      <OdsFormField invalid={ !!error.title }>
        <OdsFormFieldLabel>
          Title:
        </OdsFormFieldLabel>

        <OdsInput defaultValue={ product?.title }
                  id="title"
                  name="title"
                  required={ true }
                  onBlur={ (e) => updateError(e, 'title') }
                  onInvalid={ (e) => onInvalidField(e, 'title') } />

        <OdsFormFieldError>
          { error.title }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!error.price }>
        <OdsFormFieldLabel>
          Price:
        </OdsFormFieldLabel>

        <OdsInput defaultValue={ product?.price }
                  id="price"
                  min={ 0 }
                  name="price"
                  required={ true }
                  onBlur={ (e) => updateError(e, 'price') }
                  onInvalid={ (e) => onInvalidField(e, 'price') }
                  step="any"
                  type={ ODS_INPUT_TYPE.number } />

        <OdsFormFieldError>
          { error.price }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!error.description }>
        <OdsFormFieldLabel>
          Description:
        </OdsFormFieldLabel>

        <OdsTextarea defaultValue={ product?.description }
                     id="description"
                     name="description"
                     required={ true }
                     onBlur={ (e) => updateError(e, 'description') }
                     onInvalid={ (e) => onInvalidField(e, 'description') } />

        <OdsFormFieldError>
          { error.description }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField>
        <OdsCheckbox defaultChecked={ product?.hasReturnPolicy }
                     name="hasReturnPolicy"
                     value="true">
          <OdsCheckboxControl />

          <OdsCheckboxLabel>
            Product can be returned up to 30 days
          </OdsCheckboxLabel>
        </OdsCheckbox>
      </OdsFormField>

      <OdsFormFieldv18 error={ error?.stock }>
        <div className={ styles['product-form__fields__stock'] }>
          <label className={ styles['product-form__fields__label'] }
                 htmlFor="stock">
            Stock quantity:
          </label>

          <OdsQuantity defaultValue={ product?.stock }
                       id="stock"
                       isRequired={ true }
                       min={ 0 }
                       name="stock"
                       onOdsInvalid={ (e) => updateErrorv18(e, 'stock') } />
        </div>
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ error?.restockTime }>
        <label className={ styles['product-form__fields__label'] }
               htmlFor="restockTime">
          Restock time:
        </label>

        <OdsTimepicker defaultValue={ product?.restockTime }
                       id="restockTime"
                       isRequired={ true }
                       name="restockTime"
                       onOdsInvalid={ (e) => updateErrorv18(e, 'restockTime') }
                       timezones="all" />
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ error?.minimumOrderQuantity }>
        <label className={ styles['product-form__fields__label'] }
               htmlFor="minimumOrderQuantity">
          Minimum order quantity:
        </label>

        <div>
          <OdsRange defaultValue={ product?.minimumOrderQuantity }
                    id="minimumOrderQuantity"
                    isRequired={ true }
                    name="minimumOrderQuantity"
                    onOdsInvalid={ (e) => updateErrorv18(e, 'minimumOrderQuantity') } />
        </div>
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ error?.category }>
        <label className={ styles['product-form__fields__label'] }>
          Category:
        </label>

        <div className={ styles['product-form__fields__category'] }>
          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'beauty' }
                      isRequired={ true }
                      inputId="category-beauty"
                      name="category"
                      onOdsInvalid={ (e) => updateErrorv18(e, 'category') }
                      value="beauty" />
            <label htmlFor="category-beauty">Beauty</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'fragrances' }
                      isRequired={ true }
                      inputId="category-fragrances"
                      name="category"
                      onOdsInvalid={ (e) => updateErrorv18(e, 'category') }
                      value="fragrances" />
            <label htmlFor="category-fragrances">Fragrances</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'furniture' }
                      isRequired={ true }
                      inputId="category-furniture"
                      name="category"
                      onOdsInvalid={ (e) => updateErrorv18(e, 'category') }
                      value="furniture" />
            <label htmlFor="category-furniture">Furniture</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'groceries' }
                      isRequired={ true }
                      inputId="category-groceries"
                      name="category"
                      onOdsInvalid={ (e) => updateErrorv18(e, 'category') }
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

ProductFormNative.propTypes = propTypes

export { ProductFormNative }
