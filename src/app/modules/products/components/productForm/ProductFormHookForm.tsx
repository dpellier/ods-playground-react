import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import type { ProductCategory } from 'app/models/Product'
import { zodResolver } from '@hookform/resolvers/zod'
import { ODS_BUTTON_VARIANT, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsButton, OdsCheckbox, OdsFormField, OdsInput, OdsQuantity, OdsRadio, OdsRange, OdsTextarea, OdsTimepicker } from '@ovhcloud/ods-components/react'
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
      <OdsFormField error={ errors.title?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Title:
        </label>

        <Controller control={ control }
                    name="title"
                    render={({ field }) =>
                      <OdsInput defaultValue={ product?.title || '' }
                                hasError={ !!errors.title }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                type={ ODS_INPUT_TYPE.text } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.price?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Price:
        </label>

        <div className={ styles['product-form__fields__price'] }>
          <Controller control={ control }
                    name="price"
                    render={({ field }) =>
                      <OdsInput defaultValue={ product?.price }
                                hasError={ !!errors.price }
                                min={ 0 }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                step="any"
                                type={ ODS_INPUT_TYPE.number } />
                    } />

          <span className={ styles['product-form__fields__price__currency'] }>
            €
          </span>
        </div>
      </OdsFormField>

      <OdsFormField error={ errors.description?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Description:
        </label>

        <Controller control={ control }
                    name="description"
                    render={({ field }) =>
                      <OdsTextarea defaultValue={ product?.description || '' }
                                   hasError={ !!errors.description }
                                   name={ field.name }
                                   onOdsBlur={ field.onBlur }
                                   onOdsChange={ field.onChange } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.hasReturnPolicy?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Return policy:
        </label>

        <div className={ styles['product-form__fields__return-policy'] }>
            <Controller control={ control }
                        name="hasReturnPolicy"
                        render={({ field }) =>
                          <div className={ styles['product-form__fields__return-policy__option'] }>
                            <OdsCheckbox hasError={ !!errors.hasReturnPolicy }
                                         isChecked={ product?.hasReturnPolicy }
                                         inputId="has-return-policy"
                                         name={ field.name }
                                         onOdsBlur={ field.onBlur }
                                         onOdsChange={ (e) => {
                                           setValue(field.name, e.detail.checked)
                                         }} />
                            <label htmlFor="has-return-policy">Product can be returned up to 30 days</label>
                          </div>
                        } />
        </div>
      </OdsFormField>

      <OdsFormField error={ errors.stock?.message }>
        <div className={ styles['product-form__fields__stock'] }>
          <label className={ styles['product-form__fields__label'] }>
            Stock quantity:
          </label>

          <Controller control={ control }
                      name="stock"
                      render={({ field }) =>
                        <OdsQuantity defaultValue={ product?.stock }
                                     hasError={ !!errors.stock }
                                     name={ field.name }
                                     onOdsBlur={ field.onBlur }
                                     onOdsChange={ field.onChange } />
                      } />
        </div>
      </OdsFormField>

      <OdsFormField error={ errors.restockTime?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Restock time:
        </label>

        <Controller control={ control }
                    name="restockTime"
                    render={({ field }) =>
                      <OdsTimepicker defaultValue={ product?.restockTime || '' }
                                     hasError={ !!errors.restockTime }
                                     name={ field.name }
                                     onOdsBlur={ field.onBlur }
                                     onOdsChange={ field.onChange }
                                     timezones="all" />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.minimumOrderQuantity?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Minimum order quantity:
        </label>

        <Controller control={ control }
                    name="minimumOrderQuantity"
                    render={({ field }) =>
                      <div>
                        <OdsRange defaultValue={ product?.minimumOrderQuantity }
                                  hasError={ !!errors.minimumOrderQuantity }
                                  name={ field.name }
                                  onOdsBlur={ field.onBlur }
                                  onOdsChange={ field.onChange } />
                      </div>
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.category?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Category:
        </label>

        <div className={ styles['product-form__fields__category'] }>
            <Controller control={ control }
                        name="category"
                        render={({ field }) =>
                          <div className={ styles['product-form__fields__category__option'] }>
                            <OdsRadio hasError={ !!errors.category }
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
                        } />

          <div className={ styles['product-form__fields__category__option'] }>
            <Controller control={ control }
                        name="category"
                        render={({ field }) =>
                          <div className={ styles['product-form__fields__category__option'] }>
                            <OdsRadio hasError={ !!errors.category }
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
                        } />
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <Controller control={ control }
                        name="category"
                        render={({ field }) =>
                          <div className={ styles['product-form__fields__category__option'] }>
                            <OdsRadio hasError={ !!errors.category }
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
                        } />
          </div>

          <div className={ styles['product-form__fields__category__option'] }>
            <Controller control={ control }
                        name="category"
                        render={({ field }) =>
                          <div className={ styles['product-form__fields__category__option'] }>
                            <OdsRadio hasError={ !!errors.category }
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
                        } />
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

ProductFormHookForm.propTypes = propTypes

export { ProductFormHookForm }
