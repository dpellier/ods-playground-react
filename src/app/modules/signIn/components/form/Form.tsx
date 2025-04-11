import type { InferProps } from 'prop-types'
import type { FC, FocusEvent, FormEvent } from 'react'
import type { ValidationError } from 'yup'
import { OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsInput, OdsPassword } from '@ovhcloud/ods-react'
import { ODS_BUTTON_COLOR, OdsButton } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import * as yup from 'yup'
import styles from './form.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const validationSchema = yup.object({
  password: yup.string().required('Password has to be set'),
  username: yup.string().required('Username has to be set'),
})

const Form: FC<InferProps<typeof propTypes>> = ({ isPending, onSubmit }) => {
  const [error, setError] = useState<Record<string, string>>({})

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formObj = Object.fromEntries(formData.entries())

    try {
      if(await validationSchema.isValid(formObj)) {
        setError({})
        onSubmit(formObj)
      }
      else {
        await validationSchema.validate(formObj, { abortEarly: false })
      }
    }
    catch(err) {
      setError(((err as ValidationError).inner || []).reduce((res, error) => {
        if (error.path) {
          res[error.path] = error.message
        }
        return res
      }, {} as Record<string, string>))
    }
  }

  async function validateField(e: FocusEvent, fieldName: string) {
    try {
      await validationSchema.validateAt(fieldName, { [fieldName]: (e.target as HTMLInputElement).value })
      setError((error) => ({
        ...error,
        [fieldName]: '',
      }))
    } catch(err) {
      setError((error) => ({
        ...error,
        [fieldName]: (err as ValidationError).message,
      }))
    }
  }

  return (
    <form className={ styles.form }
          onSubmit={ onFormSubmit }>
      <OdsFormField invalid={ !!error.username }>
        <OdsFormFieldLabel>
          Username:
        </OdsFormFieldLabel>

        <OdsInput className={ styles['form__field__username'] }
                  name="username"
                  onBlur={ (e) => validateField(e, 'username') } />

        <OdsFormFieldError>
          { error.username }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!error.password }>
        <OdsFormFieldLabel>
          Password:
        </OdsFormFieldLabel>

        <OdsPassword className={ styles['form__field__password'] }
                     name="password"
                     onBlur={ (e) => validateField(e, 'password') } />

        <OdsFormFieldError>
          { error.password }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsButton className={ styles['form__submit'] }
                 color={ ODS_BUTTON_COLOR.primary }
                 isLoading={ isPending }
                 type="submit">
        Sign In
      </OdsButton>
    </form>
  )
}

Form.propTypes = propTypes

export { Form }
