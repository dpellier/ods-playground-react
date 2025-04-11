import type { OdsFormElement } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { FC, FormEvent } from 'react'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsDatepicker, OdsFormField as OdsFormFieldv18, OdsPhoneNumber, OdsSelect } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton, OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsInput } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { User, USER_BIRTH_DATE_FORMAT, USER_ROLES } from 'app/models/User'
import styles from './userForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User),
}

const UserFormNative: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, user }) => {
  const [error, setError] = useState<Record<string, string>>({})
  const roleOptions = useMemo(() => {
    return USER_ROLES.map((role, idx) => (
      <option key={ idx } value={ role }>{ role }</option>
    ))
  }, [USER_ROLES])

  function onFormSubmit(e: FormEvent) {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    onSubmit({
      ...Object.fromEntries(formData.entries()),
      id: user?.id,
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
    <form className={ styles['user-form'] }
          onSubmit={ onFormSubmit }>
      <OdsFormField invalid={ !!error.firstName }>
        <OdsFormFieldLabel>
          First name:
        </OdsFormFieldLabel>

        <OdsInput defaultValue={ user?.firstName }
                  id="firstName"
                  name="firstName"
                  onInvalid={ (e) => updateError(e, 'firstName') }
                  required={ true }
                  type={ ODS_INPUT_TYPE.text } />

        <OdsFormFieldError>
          { error.firstName }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!error.lastName }>
        <OdsFormFieldLabel>
          Last name:
        </OdsFormFieldLabel>

        <OdsInput defaultValue={ user?.lastName }
                  id="lastName"
                  name="lastName"
                  onInvalid={ (e) => updateError(e, 'lastName') }
                  required={ true }
                  type={ ODS_INPUT_TYPE.text } />

        <OdsFormFieldError>
          { error.lastName }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!error.email }>
        <OdsFormFieldLabel>
          Email:
        </OdsFormFieldLabel>

        <OdsInput defaultValue={ user?.email }
                  id="email"
                  name="email"
                  onInvalid={ (e) => updateError(e, 'email') }
                  required={ true }
                  type={ ODS_INPUT_TYPE.email } />

        <OdsFormFieldError>
          { error.email }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormFieldv18 error={ error?.phone }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="phone">
          Phone number:
        </label>

        <OdsPhoneNumber countries="all"
                        defaultValue={ user?.phone }
                        id="phone"
                        isRequired={ true }
                        name="phone"
                        onOdsInvalid={ (e) => updateErrorv18(e, 'phone') } />
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ error?.birthDate }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="birthDate">
          Birth date:
        </label>

        {/* @ts-ignore IDE gets confused with other React wrapper type */}
        <OdsDatepicker defaultValue={ user?.birthDate }
                       format={ USER_BIRTH_DATE_FORMAT }
                       id="birthDate"
                       isRequired={ true }
                       name="birthDate"
                       onOdsInvalid={ (e) => updateErrorv18(e, 'birthDate') } />
      </OdsFormFieldv18>

      <OdsFormField invalid={ !!error.ip }>
        <OdsFormFieldLabel>
          IP address:
        </OdsFormFieldLabel>

        <OdsInput defaultValue={ user?.ip }
                  id="ip"
                  name="ip"
                  onInvalid={ (e) => updateError(e, 'ip') }
                  pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                  required={ true }
                  type={ ODS_INPUT_TYPE.text } />

        <OdsFormFieldError>
          { error.email }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormFieldv18 error={ error?.role }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="role">
          Role:
        </label>

        <OdsSelect defaultValue={ user?.role }
                   id="role"
                   isRequired={ true }
                   name="role"
                   onOdsInvalid={ (e) => updateErrorv18(e, 'role') }>
          { roleOptions }
        </OdsSelect>
      </OdsFormFieldv18>

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

UserFormNative.propTypes = propTypes

export { UserFormNative }
