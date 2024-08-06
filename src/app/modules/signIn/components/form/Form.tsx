import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_COLOR, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OdsButton, OdsFormField, OdsInput, OdsPassword } from '@ovhcloud/ods-components/react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import styles from './form.module.scss'

const propTypes = {
  isPending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const validationSchema = yup.object({
  password: yup.string().required('Password has to be set'),
  username: yup.string().required('Username has to be set')
})

const Form: FC<InferProps<typeof propTypes>> = ({ isPending, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <form className={ styles.form }
          onSubmit={ formik.handleSubmit }>
      <OdsFormField error={ (formik.touched.username && formik.errors.username) as string }>
        <label className={ styles['form__field__label'] }>
          Username:
        </label>

        <OdsInput className={ styles['form__field__username'] }
                  hasError={ formik.touched.username && !!formik.errors.username }
                  name="username"
                  onOdsBlur={ formik.handleBlur }
                  onOdsChange={ formik.handleChange }
                  type={ ODS_INPUT_TYPE.text } />
      </OdsFormField>

      <OdsFormField error={ (formik.touched.password && formik.errors.password) as string }>
        <label className={ styles['form__field__label'] }>
          Password:
        </label>

        <OdsPassword className={ styles['form__field__password'] }
                     hasError={ formik.touched.password && !!formik.errors.password }
                     name="password"
                     onOdsBlur={ formik.handleBlur }
                     onOdsChange={ formik.handleChange } />
      </OdsFormField>

      <OdsButton className={ styles['form__submit'] }
                 color={ ODS_BUTTON_COLOR.primary }
                 isLoading={ isPending }
                 label="Sign In"
                 type="submit" />
    </form>
  )
}

Form.propTypes = propTypes

export { Form }
