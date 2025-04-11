import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsDatepicker, OdsFormField as OdsFormFieldv18, OdsPhoneNumber, OdsSelect } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton, OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsInput } from '@ovhcloud/ods-react'
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
    return USER_ROLES.map((role, idx) => (
      <option key={ idx } value={ role }>{ role }</option>
    ))
  }, [USER_ROLES])

  return (
    <form className={ styles['user-form'] }
          onSubmit={ handleSubmit(onSubmit) }>
      <OdsFormField invalid={ !!errors.firstName }>
        <OdsFormFieldLabel>
          First name:
        </OdsFormFieldLabel>

        <OdsInput { ...register('firstName') } />

        <OdsFormFieldError>
          { errors.firstName?.message }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!errors.lastName }>
        <OdsFormFieldLabel>
          Last name:
        </OdsFormFieldLabel>

        <OdsInput { ...register('lastName') } />

        <OdsFormFieldError>
          { errors.lastName?.message }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!errors.email }>
        <OdsFormFieldLabel>
          Email:
        </OdsFormFieldLabel>

        <OdsInput { ...register('email') }
                  type={ ODS_INPUT_TYPE.email } />

        <OdsFormFieldError>
          { errors.email?.message }
        </OdsFormFieldError>
      </OdsFormField>

      <Controller control={ control }
                  name="phone"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
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
                    </OdsFormFieldv18>
                  } />

      <Controller control={ control }
                  name="birthDate"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
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
                    </OdsFormFieldv18>
                  } />

      <OdsFormField invalid={ !!errors.ip }>
        <OdsFormFieldLabel>
          IP address:
        </OdsFormFieldLabel>

        <OdsInput { ...register('ip') } />

        <OdsFormFieldError>
          { errors.ip?.message }
        </OdsFormFieldError>
      </OdsFormField>

      <Controller control={ control }
                  name="role"
                  render={({ field, fieldState }) =>
                    <OdsFormFieldv18 error={ fieldState.error?.message }>
                      <label className={ styles['user-form__fields__label'] }
                             htmlFor={ field.name }>
                        Role:
                      </label>

                      <OdsSelect defaultValue={ user?.role }
                                 hasError={ !!fieldState.error }
                                 id={ field.name }
                                 name={ field.name }
                                 onOdsBlur={ field.onBlur }
                                 onOdsChange={ field.onChange }>
                        { roleOptions }
                      </OdsSelect>
                    </OdsFormFieldv18>
                  } />

      <div className={ styles['user-form__actions'] }>
        <OdsButton onClick={ onCancel }
                   type="button"
                   variant={ ODS_BUTTON_VARIANT.outline }>
          Cancel
        </OdsButton>

        <OdsButton isLoading={ isPending }
                   type="submit">
          { !!user ? 'Update' : 'Create' }
        </OdsButton>
      </div>
    </form>
  )
}

UserFormHookForm.propTypes = propTypes

export { UserFormHookForm }
