import type { OdsDatepickerChangeEvent, OdsPhoneNumberChangeEvent } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { ChangeEvent, FC } from 'react'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsDatepicker, OdsFormField, OdsPhoneNumber } from '@ovhcloud/ods-components/react'
import { BUTTON_VARIANT, Button, FormField, FormFieldError, FormFieldLabel, Input, Select, SelectContent, SelectControl } from '@ovhcloud/ods-react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { z } from 'zod'
import { User, USER_BIRTH_DATE_FORMAT, USER_ROLES } from 'app/models/User'
import styles from './userForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User),
}

const validationSchema = {
  birthDate: z.date({ invalid_type_error: 'Date has to be set', required_error: 'Date has to be set' }),
  email: z.string().min(1, { message: 'Email has to be set' }).email({ message: 'Incorrect email format' }),
  firstName: z.string().min(1, { message: 'First name has to be set' }),
  ip: z.string().min(1, { message: 'IP has to be set' }).ip(),
  lastName: z.string().min(1, { message: 'Last name has to be set' }),
  phone: z.string().min(1, { message: 'Phone number has to be set' }),
  // @ts-ignore if someone wants to have a look be my guest
  role: z.enum(USER_ROLES, { message: 'Role has to be set' }),
}

const UserFormTanstackForm: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, user }) => {
  const form = useForm({
    defaultValues: user || {
      birthDate: undefined,
      email: '',
      firstName: '',
      ip: '',
      lastName: '',
      phone: '',
      role: undefined,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: z.object(validationSchema).passthrough(),
    },
  })

  const roleOptions = useMemo(() => {
    return USER_ROLES.map((role) => ({
      label: role,
      value: role,
    }))
  }, [USER_ROLES])

  return (
    <form className={ styles['user-form'] }
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}>
      <form.Field name="firstName"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.firstName }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        First name:
                      </FormFieldLabel>

                      <Input defaultValue={ user?.firstName || '' }
                             name={ field.name }
                             onBlur={ field.handleBlur }
                             onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value) }
                             type={ ODS_INPUT_TYPE.text } />

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <form.Field name="lastName"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.lastName }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Last name:
                      </FormFieldLabel>

                      <Input defaultValue={ user?.lastName || '' }
                             name={ field.name }
                             onBlur={ field.handleBlur }
                             onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value) }
                             type={ ODS_INPUT_TYPE.text } />

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <form.Field name="email"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.email }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Email:
                      </FormFieldLabel>

                      <Input defaultValue={ user?.email || '' }
                             name={ field.name }
                             onBlur={ field.handleBlur }
                             onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value) }
                             type={ ODS_INPUT_TYPE.email } />

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <form.Field name="phone"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.phone }}
                  children={ (field) => ((
                    <OdsFormField error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
                      <label className={ styles['user-form__fields__label'] }
                             htmlFor={ field.name }>
                        Phone number:
                      </label>

                      <OdsPhoneNumber countries="all"
                                      defaultValue={ user?.phone || '' }
                                      hasError={ !!field.state.meta.errors.length }
                                      id={ field.name }
                                      name={ field.name }
                                      onOdsBlur={ field.handleBlur }
                                      onOdsChange={ (e: OdsPhoneNumberChangeEvent) => field.handleChange(e.detail.value as string || '') } />
                    </OdsFormField>
                  ))} />

      <form.Field name="birthDate"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.birthDate }}
                  children={ (field) => ((
                    <OdsFormField error={ field.state.meta.errors.length ? field.state.meta.errors[0] as string : '' }>
                      <label className={ styles['user-form__fields__label'] }
                             htmlFor={ field.name }>
                        Birth date:
                      </label>

                      {/* @ts-ignore IDE gets confused with other React wrapper type */}
                      <OdsDatepicker defaultValue={ user?.birthDate }
                                     format={ USER_BIRTH_DATE_FORMAT }
                                     hasError={ !!field.state.meta.errors.length }
                                     id={ field.name }
                                     name={ field.name }
                                     onOdsBlur={ field.handleBlur }
                                     // @ts-ignore to look later
                                     onOdsChange={ (e: OdsDatepickerChangeEvent) => field.handleChange(e.detail.value) } />
                    </OdsFormField>
                  ))} />

      <form.Field name="ip"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.ip }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        IP address:
                      </FormFieldLabel>

                      <Input defaultValue={ user?.ip || '' }
                             name={ field.name }
                             onBlur={ field.handleBlur }
                             onChange={ (e: ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value) }
                             type={ ODS_INPUT_TYPE.text } />

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <form.Field name="role"
                  validatorAdapter={ zodValidator() }
                  validators={{ onBlur: validationSchema.role }}
                  children={ (field) => ((
                    <FormField invalid={ !!field.state.meta.errors.length }>
                      <FormFieldLabel>
                        Role:
                      </FormFieldLabel>

                      <Select defaultValue={ user?.role || '' }
                              items={ roleOptions }
                              name={ field.name }
                              onBlur={ field.handleBlur }
                              // @ts-ignore to be fixed on next release
                              onValueChange={ ({ value }) => field.handleChange(value[0]) }>
                        <SelectControl />

                        <SelectContent />
                      </Select>

                      <FormFieldError>
                        { field.state.meta.errors.length ? field.state.meta.errors[0] : '' }
                      </FormFieldError>
                    </FormField>
                  ))} />

      <div className={ styles['user-form__actions'] }>
        <Button onClick={ onCancel }
                type="button"
                variant={ BUTTON_VARIANT.outline }>
          Cancel
        </Button>

        <Button loading={ isPending }
                type="submit">
          { !!user ? 'Update' : 'Create' }
        </Button>
      </div>
    </form>
  )
}

UserFormTanstackForm.propTypes = propTypes

export { UserFormTanstackForm }
