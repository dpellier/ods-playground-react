import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_VARIANT, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsButton, OdsDatepicker, OdsFormField, OdsInput, OdsPhoneNumber, OdsSelect } from '@ovhcloud/ods-components/react'
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
  email: yup.string().email().required('Email has to be set'),
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
      <OdsFormField error={ (formik.touched.firstName && formik.errors.firstName) as string }>
        <label className={ styles['user-form__fields__label'] }>
          First name:
        </label>

        <OdsInput hasError={ formik.touched.firstName && !!formik.errors.firstName }
                  name="firstName"
                  onOdsBlur={ formik.handleBlur }
                  onOdsChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.firstName } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.lastName && formik.errors.lastName) as string }>
        <label className={ styles['user-form__fields__label'] }>
          Last name:
        </label>

        <OdsInput hasError={ formik.touched.lastName && !!formik.errors.lastName }
                  name="lastName"
                  onOdsBlur={ formik.handleBlur }
                  onOdsChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.lastName } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.email && formik.errors.email) as string }>
        <label className={ styles['user-form__fields__label'] }>
          Email:
        </label>

        <OdsInput hasError={ formik.touched.email && !!formik.errors.email }
                  name="email"
                  onOdsBlur={ formik.handleBlur }
                  onOdsChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.email }
                  value={ formik.values.email } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.phone && formik.errors.phone) as string }>
        <label className={ styles['user-form__fields__label'] }>
          Phone number:
        </label>

        <OdsPhoneNumber countries="all"
                        hasError={ formik.touched.phone && !!formik.errors.phone }
                        name="phone"
                        onOdsBlur={ formik.handleBlur }
                        onOdsChange={ formik.handleChange }
                        value={ formik.values.phone } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.birthDate && formik.errors.birthDate) as string }>
        <label className={ styles['user-form__fields__label'] }>
          Birth date:
        </label>

        <OdsDatepicker format={ USER_BIRTH_DATE_FORMAT }
                       hasError={ formik.touched.birthDate && !!formik.errors.birthDate }
                       name="birthDate"
                       onOdsBlur={ formik.handleBlur }
                       onOdsChange={ formik.handleChange }
                       value={ formik.values.birthDate } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.ip && formik.errors.ip) as string }>
        <label className={ styles['user-form__fields__label'] }>
          IP address:
        </label>

        <OdsInput hasError={ formik.touched.ip && !!formik.errors.ip }
                  name="ip"
                  onOdsBlur={ formik.handleBlur }
                  onOdsChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text }
                  value={ formik.values.ip } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.role && formik.errors.role) as string }>
        <label className={ styles['user-form__fields__label'] }>
          Role:
        </label>

        <OdsSelect hasError={ formik.touched.role && !!formik.errors.role }
                   name="role"
                   onOdsBlur={ formik.handleBlur }
                   onOdsChange={ formik.handleChange }
                   value={ formik.values.role }>
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

UserFormFormik.propTypes = propTypes

export { UserFormFormik }
