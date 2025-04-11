import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsDatepicker, OdsFormField as OdsFormFieldv18, OdsPhoneNumber, OdsSelect } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton, OdsFormField, OdsFormFieldError, OdsFormFieldLabel, OdsInput } from '@ovhcloud/ods-react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import * as yup from 'yup'
import { User, USER_BIRTH_DATE_FORMAT, USER_ROLES } from 'app/models/User'
import styles from './userForm.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User),
}

const validationSchema = yup.object({
  birthDate: yup.date().required('Birth date has to be set'),
  email: yup.string().email('Incorrect email format').required('Email has to be set'),
  firstName: yup.string().required('First name has to be set'),
  ip: yup.string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Incorrect IP format')
    .required('IP has to be set'),
  lastName: yup.string().required('Last name has to be set'),
  phone: yup.string().required('Phone number has to be set'),
  role: yup.string().oneOf(USER_ROLES).required('Role has to be set'),
})

const UserFormFormik: FC<InferProps<typeof propTypes>> = ({ isPending, onCancel, onSubmit, user }) => {
  const formik = useFormik({
    initialValues: user || {
      birthDate: undefined,
      email: '',
      firstName: '',
      ip: '',
      lastName: '',
      phone: '',
      role: '',
    },
    onSubmit,
    validationSchema,
  })
  const roleOptions = useMemo(() => {
    return USER_ROLES.map((role, idx) => (
      <option key={ idx } value={ role }>{ role }</option>
    ))
  }, [USER_ROLES])

  return (
    <form className={ styles['user-form'] }
          onSubmit={ formik.handleSubmit }>
      <OdsFormField invalid={ !!(formik.touched.firstName && formik.errors.firstName) }>
        <OdsFormFieldLabel>
          First name:
        </OdsFormFieldLabel>

        <OdsInput name="firstName"
                  onBlur={ formik.handleBlur }
                  onChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.firstName } />

        <OdsFormFieldError>
          { formik.errors.firstName }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!(formik.touched.lastName && formik.errors.lastName) }>
        <OdsFormFieldLabel>
          Last name:
        </OdsFormFieldLabel>

        <OdsInput name="lastName"
                  onBlur={ formik.handleBlur }
                  onChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.lastName } />

        <OdsFormFieldError>
          { formik.errors.lastName }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormField invalid={ !!(formik.touched.email && formik.errors.email) }>
        <OdsFormFieldLabel>
          Email:
        </OdsFormFieldLabel>

        <OdsInput name="email"
                  onBlur={ formik.handleBlur }
                  onChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.email }
                  value={ formik.values.email } />

        <OdsFormFieldError>
          { formik.errors.email }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormFieldv18 error={ (formik.touched.phone && formik.errors.phone) as string }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="phone">
          Phone number:
        </label>

        <OdsPhoneNumber countries="all"
                        hasError={ formik.touched.phone && !!formik.errors.phone }
                        id="phone"
                        name="phone"
                        onOdsBlur={ formik.handleBlur }
                        onOdsChange={ formik.handleChange }
                        value={ formik.values.phone } />
      </OdsFormFieldv18>

      <OdsFormFieldv18 error={ (formik.touched.birthDate && formik.errors.birthDate) as string }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="birthDate">
          Birth date:
        </label>

        <OdsDatepicker format={ USER_BIRTH_DATE_FORMAT }
                       hasError={ formik.touched.birthDate && !!formik.errors.birthDate }
                       id="birthDate"
                       name="birthDate"
                       onOdsBlur={ formik.handleBlur }
                       onOdsChange={ formik.handleChange }
                       value={ formik.values.birthDate } />
      </OdsFormFieldv18>

      <OdsFormField invalid={ !!(formik.touched.ip && formik.errors.ip) }>
        <OdsFormFieldLabel>
          IP address:
        </OdsFormFieldLabel>

        <OdsInput name="ip"
                  onBlur={ formik.handleBlur }
                  onChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.ip } />

        <OdsFormFieldError>
          { formik.errors.ip }
        </OdsFormFieldError>
      </OdsFormField>

      <OdsFormFieldv18 error={ (formik.touched.role && formik.errors.role) as string }>
        <label className={ styles['user-form__fields__label'] }
               htmlFor="role">
          Role:
        </label>

        <OdsSelect hasError={ formik.touched.role && !!formik.errors.role }
                   id="role"
                   name="role"
                   onOdsBlur={ formik.handleBlur }
                   onOdsChange={ formik.handleChange }
                   value={ formik.values.role }>
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

UserFormFormik.propTypes = propTypes

export { UserFormFormik }
