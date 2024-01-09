import type { Toast } from 'react-hot-toast'
import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming'
import { OsdsMessage, OsdsText } from '@ovhcloud/ods-components/react'
import { resolveValue, Toaster as ToasterVendor } from 'react-hot-toast'

function getMessageColor(toast: Toast) {
  switch (toast.type) {
    case 'error':
      return ODS_THEME_COLOR_INTENT.error
    case 'success':
      return ODS_THEME_COLOR_INTENT.success
    default:
      return ODS_THEME_COLOR_INTENT.default
  }
}

const Toaster = () => {
  return (
    <ToasterVendor position="top-right"
                   reverseOrder={ false }>
      {
        (toast) => {
          const messageColor = getMessageColor(toast)

          return (
            <OsdsMessage color={ messageColor }
                         inline={ true }>
              <OsdsText color={ messageColor }>
                { resolveValue(toast.message, toast) }
              </OsdsText>
            </OsdsMessage>
          )
        }
      }
    </ToasterVendor>
  )
}

export { Toaster }
