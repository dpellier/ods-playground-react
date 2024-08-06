import type { InferProps } from 'prop-types'
import type {FC, FormEvent} from 'react'
import { ODS_BUTTON_VARIANT, ODS_ICON_NAME, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsButton, OdsFormField, OdsIcon, OdsInput, OdsPhoneNumber, OdsTooltip } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { User } from 'app/models/User'
import styles from './userForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User),
}

// TODO remove all the manual validation when ods form elements validity will be updated on next version
const UserForm: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, user }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<Record<string, string>>()

  function onFormSubmit(event: FormEvent) {
    event.preventDefault()

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const formError: Record<string, string> = {};

      ['email', 'firstName', 'ip', 'lastName', 'phone'].forEach((field) => {
        if (!formData.get(field)) {
          formError[field] = 'This field is required'
        }
      })

      setError(formError)

      if (Object.keys(formError).length === 0) {
        onSubmit(new FormData(formRef.current))
      }
    }
  }

  return (
    <form className={ styles['user-form'] }
          onSubmit={ onFormSubmit }
          ref={ formRef }>
      <OdsIcon className={ styles['user-form__info'] }
               id="form-info-tooltip-trigger"
               name={ ODS_ICON_NAME.circleInfo } />

      <OdsTooltip triggerId="form-info-tooltip-trigger">
        <p>
          This page is an example of a form that does not use any form framework, it relies only on native elements.
          <br />
          The present version does not handle validation in an easy way, so this page will be updated with better behaviour
          on next ODS release.
        </p>
      </OdsTooltip>

      <OdsFormField error={ error?.firstName }>
        <label className={ styles['user-form__fields__label'] }>
          First name:
        </label>

        <OdsInput hasError={ !!error?.firstName } // TODO
                  name="firstName"
                  isRequired={ true }
                  type={ ODS_INPUT_TYPE.text }
                  value={ user?.firstName } />
      </OdsFormField>

      <OdsFormField error={ error?.lastName }>
        <label className={ styles['user-form__fields__label'] }>
          Last name:
        </label>

        <OdsInput hasError={ !!error?.lastName } // TODO
                  name="lastName"
                  isRequired={ true }
                  type={ ODS_INPUT_TYPE.text }
                  value={ user?.lastName } />
      </OdsFormField>

      <OdsFormField error={ error?.email }>
        <label className={ styles['user-form__fields__label'] }>
          Email:
        </label>

        <OdsInput hasError={ !!error?.email } // TODO
                  name="email"
                  isRequired={ true }
                  type={ ODS_INPUT_TYPE.email }
                  value={ user?.email } />
      </OdsFormField>

      <OdsFormField error={ error?.phone }>
        <label className={ styles['user-form__fields__label'] }>
          Phone number:
        </label>

        <OdsPhoneNumber countries="all"
                        hasError={ !!error?.phone } // TODO
                        name="phone"
                        isRequired={ true }
                        value={ user?.phone } />
      </OdsFormField>

      <OdsFormField error={ error?.ip }>
        <label className={ styles['user-form__fields__label'] }>
          IP address:
        </label>

        <OdsInput hasError={ !!error?.ip } // TODO
                  name="ip"
                  isRequired={ true }
                  pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                  type={ ODS_INPUT_TYPE.text }
                  value={ user?.ip } />
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

UserForm.propTypes = propTypes

export { UserForm }
