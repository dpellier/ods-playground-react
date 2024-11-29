import type { Toast } from 'react-hot-toast'
import { ODS_MESSAGE_COLOR } from '@ovhcloud/ods-components'
import { OdsMessage } from '@ovhcloud/ods-components/react'
import { resolveValue, Toaster as ToasterVendor } from 'react-hot-toast'

function getMessageColor(toast: Toast) {
  switch (toast.type) {
    case 'error':
      return ODS_MESSAGE_COLOR.critical
    case 'success':
      return ODS_MESSAGE_COLOR.success
    default:
      return ODS_MESSAGE_COLOR.information
  }
}

const Toaster = () => {
  return (
    <ToasterVendor position="top-right"
                   reverseOrder={ false }>
      {
        (toast) => ((
          <OdsMessage color={ getMessageColor(toast) }
                      isDismissible={ false }>
            { resolveValue(toast.message, toast) }
          </OdsMessage>
        ))
      }
    </ToasterVendor>
  )
}

export { Toaster }
