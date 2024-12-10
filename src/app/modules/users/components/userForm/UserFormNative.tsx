import type { OdsFormElement } from '@ovhcloud/ods-components'
import type { InferProps } from 'prop-types'
import type { FC, FormEvent } from 'react'
import { ODS_BUTTON_VARIANT, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsButton, OdsDatepicker, OdsFormField, OdsInput, OdsPhoneNumber, OdsSelect } from '@ovhcloud/ods-components/react'
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

  async function updateError(e: CustomEvent, field: string): Promise<void> {
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
      <OdsFormField error={ error?.firstName }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="firstName">
          First name:
        </label>

        <OdsInput defaultValue={ user?.firstName }
                  id="firstName"
                  isRequired={ true }
                  name="firstName"
                  onOdsInvalid={ (e) => updateError(e, 'firstName') }
                  type={ ODS_INPUT_TYPE.text } />
      </OdsFormField>

      <OdsFormField error={ error?.lastName }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="lastName">
          Last name:
        </label>

        <OdsInput defaultValue={ user?.lastName }
                  id="lastName"
                  isRequired={ true }
                  name="lastName"
                  onOdsInvalid={ (e) => updateError(e, 'lastName') }
                  type={ ODS_INPUT_TYPE.text } />
      </OdsFormField>

      <OdsFormField error={ error?.email }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="email">
          Email:
        </label>

        <OdsInput defaultValue={ user?.email }
                  id="email"
                  isRequired={ true }
                  name="email"
                  onOdsInvalid={ (e) => updateError(e, 'email') }
                  type={ ODS_INPUT_TYPE.email } />
      </OdsFormField>

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
                        onOdsInvalid={ (e) => updateError(e, 'phone') } />
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
                       onOdsInvalid={ (e) => updateError(e, 'birthDate') } />
      </OdsFormField>

      <OdsFormField error={ error?.ip }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="ip">
          IP address:
        </label>

        <OdsInput defaultValue={ user?.ip }
                  id="ip"
                  isRequired={ true }
                  name="ip"
                  onOdsInvalid={ (e) => updateError(e, 'ip') }
                  pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                  type={ ODS_INPUT_TYPE.text } />
      </OdsFormField>

      <OdsFormField error={ error?.role }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="role">
          Role:
        </label>

        <OdsSelect defaultValue={ user?.role }
                   id="role"
                   isRequired={ true }
                   name="role"
                   onOdsInvalid={ (e) => updateError(e, 'role') }>
          { roleOptions }
        </OdsSelect>
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

UserFormNative.propTypes = propTypes

export { UserFormNative }
