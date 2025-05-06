import type { OdsFormElement } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { FC, FormEvent } from 'react'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsDatepicker, OdsFormField, OdsPhoneNumber } from '@ovhcloud/ods-components/react'
import { BUTTON_VARIANT, Button, FormField, FormFieldError, FormFieldLabel, Input, Select, SelectContent, SelectControl } from '@ovhcloud/ods-react'
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
    return USER_ROLES.map((role) => ({
      label: role,
      value: role,
    }))
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
      <FormField invalid={ !!error.firstName }>
        <FormFieldLabel>
          First name:
        </FormFieldLabel>

        <Input defaultValue={ user?.firstName }
               id="firstName"
               name="firstName"
               onInvalid={ (e) => updateError(e, 'firstName') }
               required={ true }
               type={ ODS_INPUT_TYPE.text } />

        <FormFieldError>
          { error.firstName }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!error.lastName }>
        <FormFieldLabel>
          Last name:
        </FormFieldLabel>

        <Input defaultValue={ user?.lastName }
               id="lastName"
               name="lastName"
               onInvalid={ (e) => updateError(e, 'lastName') }
               required={ true }
               type={ ODS_INPUT_TYPE.text } />

        <FormFieldError>
          { error.lastName }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!error.email }>
        <FormFieldLabel>
          Email:
        </FormFieldLabel>

        <Input defaultValue={ user?.email }
               id="email"
               name="email"
               onInvalid={ (e) => updateError(e, 'email') }
               required={ true }
               type={ ODS_INPUT_TYPE.email } />

        <FormFieldError>
          { error.email }
        </FormFieldError>
      </FormField>

      <OdsFormField error={ error?.phone }>
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
      </OdsFormField>

      <OdsFormField error={ error?.birthDate }>
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
      </OdsFormField>

      <FormField invalid={ !!error.ip }>
        <FormFieldLabel>
          IP address:
        </FormFieldLabel>

        <Input defaultValue={ user?.ip }
               id="ip"
               name="ip"
               onInvalid={ (e) => updateError(e, 'ip') }
               pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
               required={ true }
               type={ ODS_INPUT_TYPE.text } />

        <FormFieldError>
          { error.email }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!error.role }>
        <FormFieldLabel>
          Role:
        </FormFieldLabel>

        <Select defaultValue={ user?.role }
                items={ roleOptions }
                name="role"
                onInvalid={ (e) => updateError(e, 'role') }
                required={ true }>
          <SelectControl />

          <SelectContent />
        </Select>

        <FormFieldError>
          { error.role }
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

UserFormNative.propTypes = propTypes

export { UserFormNative }
