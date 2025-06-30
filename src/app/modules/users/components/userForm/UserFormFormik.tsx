import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { BUTTON_VARIANT, INPUT_TYPE, Button, Datepicker, DatepickerContent, DatepickerControl, FormField, FormFieldError, FormFieldLabel, Input, PhoneNumber, PhoneNumberControl, PhoneNumberCountryList, Select, SelectContent, SelectControl } from '@ovhcloud/ods-react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import * as yup from 'yup'
import { User, USER_ROLES } from 'app/models/User'
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
               type={ INPUT_TYPE.text }
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
               type={ INPUT_TYPE.text }
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
               type={ INPUT_TYPE.email }
               value={ formik.values.email } />

        <FormFieldError>
          { formik.errors.email }
        </FormFieldError>
      </FormField>

      <FormField invalid={ !!(formik.touched.phone && formik.errors.phone) }>
        <FormFieldLabel>
          Phone number:
        </FormFieldLabel>

        <PhoneNumber countries="all"
                     name="phone"
                     onBlur={ formik.handleBlur }
                     onChange={ formik.handleChange }
                     value={ formik.values.phone }>
          <PhoneNumberCountryList />

          <PhoneNumberControl />
        </PhoneNumber>
      </FormField>

      <FormField invalid={ !!(formik.touched.birthDate && formik.errors.birthDate) }>
        <FormFieldLabel>
          Birth date:
        </FormFieldLabel>

        <Datepicker name="birthDate"
                    onBlur={ formik.handleBlur }
                    onValueChange={ ({ value }) => {
                      formik.setFieldValue('birthDate', value);
                    }}
                    value={ formik.values.birthDate }>
          <DatepickerControl />

          <DatepickerContent />
        </Datepicker>
      </FormField>

      <FormField invalid={ !!(formik.touched.ip && formik.errors.ip) }>
        <FormFieldLabel>
          IP address:
        </FormFieldLabel>

        <Input name="ip"
               onBlur={ formik.handleBlur }
               onChange={ formik.handleChange }
               type={ INPUT_TYPE.text }
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
                onValueChange={ ({ value }) => {
                  formik.setFieldValue('role', value[0]);
                }}
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
