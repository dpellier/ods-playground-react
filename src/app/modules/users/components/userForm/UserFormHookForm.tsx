import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ODS_BUTTON_VARIANT, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsButton, OdsDatepicker, OdsFormField, OdsInput, OdsPhoneNumber, OdsSelect } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { User, USER_ROLES } from 'app/models/User'
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
      <OdsFormField error={ errors.firstName?.message }>
        <label className={ styles['user-form__fields__label'] }>
          First name:
        </label>

        <Controller control={ control }
                    name="firstName"
                    render={({ field }) =>
                      <OdsInput defaultValue={ user?.firstName || '' }
                                hasError={ !!errors.firstName }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                type={ ODS_INPUT_TYPE.text } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.lastName?.message }>
        <label className={ styles['user-form__fields__label'] }>
          Last name:
        </label>

        <Controller control={ control }
                    name="lastName"
                    render={({ field }) =>
                      <OdsInput defaultValue={ user?.lastName || '' }
                                hasError={ !!errors.lastName }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                type={ ODS_INPUT_TYPE.text } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.email?.message }>
        <label className={ styles['user-form__fields__label'] }>
          Email:
        </label>

        <Controller control={ control }
                    name="email"
                    render={({ field }) =>
                      <OdsInput defaultValue={ user?.email || '' }
                                hasError={ !!errors.email }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                type={ ODS_INPUT_TYPE.email } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.phone?.message }>
        <label className={ styles['user-form__fields__label'] }>
          Phone number:
        </label>

        <Controller control={ control }
                    name="phone"
                    render={({ field }) =>
                      <OdsPhoneNumber countries="all"
                                      defaultValue={ user?.phone || '' }
                                      hasError={ !!errors.phone }
                                      name={ field.name }
                                      onOdsBlur={ field.onBlur }
                                      onOdsChange={ field.onChange } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.birthDate?.message }>
        <label className={ styles['product-form__fields__label'] }>
          Birth date:
        </label>

        <Controller control={ control }
                    name="birthDate"
                    render={({ field }) =>
                      // @ts-ignore if someone wants to have a look be my guest
                      <OdsDatepicker defaultValue={ user?.birthDate }
                                     hasError={ !!errors.birthDate }
                                     name={ field.name }
                                     onOdsBlur={ field.onBlur }
                                     onOdsChange={ field.onChange } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.ip?.message }>
        <label className={ styles['user-form__fields__label'] }>
          IP address:
        </label>

        <Controller control={ control }
                    name="ip"
                    render={({ field }) =>
                      <OdsInput defaultValue={ user?.ip || '' }
                                hasError={ !!errors.ip }
                                name={ field.name }
                                onOdsBlur={ field.onBlur }
                                onOdsChange={ field.onChange }
                                type={ ODS_INPUT_TYPE.text } />
                    } />
      </OdsFormField>

      <OdsFormField error={ errors.role?.message }>
        <label className={ styles['user-form__fields__label'] }>
          Role:
        </label>

        <Controller control={ control }
                    name="role"
                    render={({ field }) =>
                      <OdsSelect defaultValue={ user?.role }
                                 hasError={ !!errors.role }
                                 name={ field.name }
                                 onOdsBlur={ field.onBlur }
                                 onOdsChange={ field.onChange }>
                        { roleOptions }
                      </OdsSelect>
                    } />
      </OdsFormField>

      <div className={ styles['user-form__actions'] }>
        <OdsButton label="Cancel"
                   onClick={ onCancel }
                   type="button"
                   variant={ ODS_BUTTON_VARIANT.outline } />

        <OdsButton isLoading={ isPending }
                   label={ !!user ? 'Update' : 'Create' }
                   type="submit" />
      </div>
    </form>
  )
}

UserFormHookForm.propTypes = propTypes

export { UserFormHookForm }
