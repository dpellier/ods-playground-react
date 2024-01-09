import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_TYPE, ODS_INPUT_TYPE } from '@ovhcloud/ods-components'
import { OsdsFormField, OsdsInput, OsdsText } from '@ovhcloud/ods-components/react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { LoadingButton } from 'app/components/loadingButton/LoadingButton'
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
      <OsdsFormField error={ (formik.touched.username && formik.errors.username) as string }>
        <OsdsText slot="label">
          Username:
        </OsdsText>

        <OsdsInput error={ formik.touched.username && !!formik.errors.username }
                   name="username"
                   onOdsInputBlur={ formik.handleBlur }
                   onOdsValueChange={ formik.handleChange }
                   type={ ODS_INPUT_TYPE.text } />
      </OsdsFormField>

      <OsdsFormField error={ (formik.touched.password && formik.errors.password) as string }>
        <OsdsText slot="label">
          Password:
        </OsdsText>

        <OsdsInput error={ formik.touched.password && !!formik.errors.password }
                   name="password"
                   onOdsInputBlur={ formik.handleBlur }
                   onOdsValueChange={ formik.handleChange }
                   type={ ODS_INPUT_TYPE.password } />
      </OsdsFormField>

      <LoadingButton isPending={ isPending }
                     type={ ODS_BUTTON_TYPE.submit }>
        Sign In
      </LoadingButton>
    </form>
  )
}

Form.propTypes = propTypes

export { Form }
