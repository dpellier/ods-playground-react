import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsDatepicker, OdsFormField, OdsPhoneNumber } from '@ovhcloud/ods-components/react'
import { BUTTON_VARIANT, Button, FormField, FormFieldError, FormFieldLabel, Input, Select, SelectContent, SelectControl } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { User, USER_BIRTH_DATE_FORMAT, USER_ROLES } from 'app/models/User'
import styles from './userForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User),
}

const validationSchema = z.object({
  birthDate: z.date({ invalid_type_error: 'Date has to be set', required_error: 'Date has to be set' }),
  email: z.string().min(1, { message: 'Email has to be set' }).email({ message: 'Incorrect email format' }),
  firstName: z.string().min(1, { message: 'First name has to be set' }),
  ip: z.string().min(1, { message: 'IP has to be set' }).ip(),
  lastName: z.string().min(1, { message: 'Last name has to be set' }),
  phone: z.string().min(1, { message: 'Phone number has to be set' }),
  // @ts-ignore if someone wants to have a look be my guest
  role: z.enum(USER_ROLES, { message: 'Role has to be set' }),
}).passthrough()

const UserFormHookForm: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, user }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    mode: 'onBlur',
    defaultValues: user || {
      birthDate: undefined,
      email: '',
      firstName: '',
      ip: '',
      lastName: '',
      phone: '',
      role: undefined,
    },
    resolver: zodResolver(validationSchema),
  })
  const roleOptions = useMemo(() => {
    return USER_ROLES.map((role) => ({
      label: role,
      value: role,
    }))
  }, [USER_ROLES])

  return (
    <form className={ styles['user-form'] }
          onSubmit={ handleSubmit(onSubmit) }>
      <FormField invalid={ !!errors.firstName }>
        <FormFieldLabel>
          First name:
        </FormFieldLabel>

        <Input { ...register('firstName') } />

        <FormFieldError>
          { errors.firstName?.message }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!errors.lastName }>
        <FormFieldLabel>
          Last name:
        </FormFieldLabel>

        <Input { ...register('lastName') } />

        <FormFieldError>
          { errors.lastName?.message }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!errors.email }>
        <FormFieldLabel>
          Email:
        </FormFieldLabel>

        <Input { ...register('email') }
               type={ ODS_INPUT_TYPE.email } />

        <FormFieldError>
          { errors.email?.message }
        </FormFieldError>
      </FormField>

      <Controller control={ control }
                  name="phone"
                  render={({ field, fieldState }) =>
                    <OdsFormField error={ fieldState.error?.message }>
                      <label className={ styles['user-form__fields__label'] }
                             htmlFor={ field.name }>
                        Phone number:
                      </label>

                      <OdsPhoneNumber countries="all"
                                      defaultValue={ user?.phone || '' }
                                      hasError={ !!fieldState.error }
                                      id={ field.name }
                                      name={ field.name }
                                      onOdsBlur={ field.onBlur }
                                      onOdsChange={ field.onChange } />
                    </OdsFormField>
                  } />

      <Controller control={ control }
                  name="birthDate"
                  render={({ field, fieldState }) =>
                    <OdsFormField error={ fieldState.error?.message }>
                      <label className={ styles['user-form__fields__label'] }
                             htmlFor={ field.name }>
                        Birth date:
                      </label>

                      {/*@ts-ignore if someone wants to have a look be my guest*/}
                      <OdsDatepicker defaultValue={ user?.birthDate }
                                     format={ USER_BIRTH_DATE_FORMAT }
                                     hasError={ !!fieldState.error }
                                     id={ field.name }
                                     name={ field.name }
                                     onOdsBlur={ field.onBlur }
                                     onOdsChange={ field.onChange } />
                    </OdsFormField>
                  } />

      <FormField invalid={ !!errors.ip }>
        <FormFieldLabel>
          IP address:
        </FormFieldLabel>

        <Input { ...register('ip') } />

        <FormFieldError>
          { errors.ip?.message }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!errors.role }>
        <FormFieldLabel>
          Role:
        </FormFieldLabel>

        <Select defaultValue={ user?.role }
                items={ roleOptions }
                { ...register('role') }>
          <SelectControl />

          <SelectContent />
        </Select>

        <FormFieldError>
          { errors.role?.message }
        </FormFieldError>
      </FormField>
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

UserFormHookForm.propTypes = propTypes

export { UserFormHookForm }
