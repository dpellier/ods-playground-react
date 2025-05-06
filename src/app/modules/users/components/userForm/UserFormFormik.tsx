import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsDatepicker, OdsFormField, OdsPhoneNumber } from '@ovhcloud/ods-components/react'
import { BUTTON_VARIANT, Button, FormField, FormFieldError, FormFieldLabel, Input, Select, SelectContent, SelectControl } from '@ovhcloud/ods-react'
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
    return USER_ROLES.map((role) => ({
      label: role,
      value: role,
    }))
  }, [USER_ROLES])

  return (
    <form className={ styles['user-form'] }
          onSubmit={ formik.handleSubmit }>
      <FormField invalid={ !!(formik.touched.firstName && formik.errors.firstName) }>
        <FormFieldLabel>
          First name:
        </FormFieldLabel>

        <Input name="firstName"
               onBlur={ formik.handleBlur }
               onChange={ formik.handleChange }
               type={ ODS_INPUT_TYPE.text }
               value={ formik.values.firstName } />

        <FormFieldError>
          { formik.errors.firstName }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.lastName && formik.errors.lastName) }>
        <FormFieldLabel>
          Last name:
        </FormFieldLabel>

        <Input name="lastName"
               onBlur={ formik.handleBlur }
               onChange={ formik.handleChange }
               type={ ODS_INPUT_TYPE.text }
               value={ formik.values.lastName } />

        <FormFieldError>
          { formik.errors.lastName }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.email && formik.errors.email) }>
        <FormFieldLabel>
          Email:
        </FormFieldLabel>

        <Input name="email"
               onBlur={ formik.handleBlur }
               onChange={ formik.handleChange }
               type={ ODS_INPUT_TYPE.email }
               value={ formik.values.email } />

        <FormFieldError>
          { formik.errors.email }
        </FormFieldError>
      </FormField>

      <OdsFormField error={ (formik.touched.phone && formik.errors.phone) as string }>
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
      </OdsFormField>

      <OdsFormField error={ (formik.touched.birthDate && formik.errors.birthDate) as string }>
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
      </OdsFormField>

      <FormField invalid={ !!(formik.touched.ip && formik.errors.ip) }>
        <FormFieldLabel>
          IP address:
        </FormFieldLabel>

        <Input name="ip"
               onBlur={ formik.handleBlur }
               onChange={ formik.handleChange }
               type={ ODS_INPUT_TYPE.text }
               value={ formik.values.ip } />

        <FormFieldError>
          { formik.errors.ip }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.role && formik.errors.role) }>
        <FormFieldLabel>
          Role:
        </FormFieldLabel>

        <Select defaultValue={ formik.initialValues.role }
                items={ roleOptions }
                name="role"
                onBlur={ formik.handleBlur }
                onChange={ formik.handleChange }
                required={ true }>
          <SelectControl />

          <SelectContent />
        </Select>

        <FormFieldError>
          { formik.errors.role }
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

UserFormFormik.propTypes = propTypes

export { UserFormFormik }
