import type { OdsFormElement } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { FC, FormEvent } from 'react'
import { ODS_BUTTON_VARIANT, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsButton, OdsCheckbox, OdsFormField, OdsInput, OdsQuantity, OdsRadio, OdsRange, OdsTextarea, OdsTimepicker } from '@ovhcloud/ods-components/react'
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

  async function updateError(e: CustomEvent, field: string): Promise<void> {
    if (e.detail) {
      const errorMessage = await (e.target as HTMLElement & OdsFormElement).getValidationMessage()

      if (errorMessage) {
        setError((error) => ({
          ...error,
          [field]: errorMessage,
        }))
      }
    } else {
      setError((error) => ({
        ...error,
        [field]: '',
      }))
    }
  }

  return (
    <form className={ styles['product-form'] }
          onSubmit={ onFormSubmit }>
      <OdsFormField error={ error?.title }>
        <label className={ styles['product-form__fields__label'] }>
          Title:
        </label>

        <OdsInput defaultValue={ product?.title }
                  isRequired={ true }
                  name="title"
                  onOdsInvalid={ (e) => updateError(e, 'title') }
                  type={ ODS_INPUT_TYPE.text } />
      </OdsFormField>

      <OdsFormField error={ error?.price }>
        <label className={ styles['product-form__fields__label'] }>
          Price:
        </label>

        <div className={ styles['product-form__fields__price'] }>
          <OdsInput defaultValue={ product?.price }
                    isRequired={ true }
                    min={ 0 }
                    name="price"
                    onOdsInvalid={ (e) => updateError(e, 'price') }
                    step="any"
                    type={ ODS_INPUT_TYPE.number } />

          <span className={ styles['product-form__fields__price__currency'] }>
            €
          </span>
        </div>
      </OdsFormField>

      <OdsFormField error={ error?.description }>
        <label className={ styles['product-form__fields__label'] }>
          Description:
        </label>

        <OdsTextarea defaultValue={ product?.description }
                     isRequired={ true }
                     name="description"
                     onOdsInvalid={ (e) => updateError(e, 'description') } />
      </OdsFormField>

      <OdsFormField error={ error?.hasReturnPolicy }>
        <label className={ styles['product-form__fields__label'] }>
          Return policy:
        </label>

        <div className={ styles['product-form__fields__return-policy'] }>
          <div className={ styles['product-form__fields__return-policy__option'] }>
            <OdsCheckbox inputId="has-return-policy"
                         isChecked={ product?.hasReturnPolicy }
                         name="hasReturnPolicy"
                         onOdsInvalid={ (e) => updateError(e, 'hasReturnPolicy') } />
            <label htmlFor="has-return-policy">Product can be returned up to 30 days</label>
          </div>
        </div>
      </OdsFormField>

      <OdsFormField error={ error?.stock }>
        <div className={ styles['product-form__fields__stock'] }>
          <label className={ styles['product-form__fields__label'] }>
            Stock quantity:
          </label>

          <OdsQuantity defaultValue={ product?.stock }
                       isRequired={ true }
                       min={ 0 }
                       name="stock"
                       onOdsInvalid={ (e) => updateError(e, 'stock') } />
        </div>
      </OdsFormField>

      <OdsFormField error={ error?.restockTime }>
        <label className={ styles['product-form__fields__label'] }>
          Restock time:
        </label>

        <OdsTimepicker defaultValue={ product?.restockTime }
                       isRequired={ true }
                       name="restockTime"
                       onOdsInvalid={ (e) => updateError(e, 'restockTime') }
                       timezones="all" />
      </OdsFormField>

      <OdsFormField error={ error?.minimumOrderQuantity }>
        <label className={ styles['product-form__fields__label'] }>
          Minimum order quantity:
        </label>

        <div>
          <OdsRange defaultValue={ product?.minimumOrderQuantity }
                    isRequired={ true }
                    name="minimumOrderQuantity"
                    onOdsInvalid={ (e) => updateError(e, 'minimumOrderQuantity') } />
        </div>
      </OdsFormField>

      <OdsFormField error={ error?.category }>
        <label className={ styles['product-form__fields__label'] }>
          Category:
        </label>

        <div className={ styles['product-form__fields__category'] }>
          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'beauty' }
                      isRequired={ true }
                      inputId="category-beauty"
                      name="category"
                      onOdsInvalid={ (e) => updateError(e, 'category') }
                      value="beauty" />
            <label htmlFor="category-beauty">Beauty</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'fragrances' }
                      isRequired={ true }
                      inputId="category-fragrances"
                      name="category"
                      onOdsInvalid={ (e) => updateError(e, 'category') }
                      value="fragrances" />
            <label htmlFor="category-fragrances">Fragrances</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'furniture' }
                      isRequired={ true }
                      inputId="category-furniture"
                      name="category"
                      onOdsInvalid={ (e) => updateError(e, 'category') }
                      value="furniture" />
            <label htmlFor="category-furniture">Furniture</label>
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <OdsRadio isChecked={ product?.category === 'groceries' }
                      isRequired={ true }
                      inputId="category-groceries"
                      name="category"
                      onOdsInvalid={ (e) => updateError(e, 'category') }
                      value="groceries" />
            <label htmlFor="category-groceries">Groceries</label>
          </div>
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

ProductFormNative.propTypes = propTypes

export { ProductFormNative }
