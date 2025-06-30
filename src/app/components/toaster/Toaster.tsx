import type { Toast } from 'react-hot-toast'
import { MESSAGE_COLOR, Message, MessageBody } from '@ovhcloud/ods-react'
import { resolveValue, Toaster as ToasterVendor } from 'react-hot-toast'

function getMessageColor(toast: Toast) {
  switch (toast.type) {
    case 'error':
      return MESSAGE_COLOR.critical
    case 'success':
      return MESSAGE_COLOR.success
    default:
      return MESSAGE_COLOR.information
  }
}

const Toaster = () => {
  return (
    <ToasterVendor position="top-right"
                   reverseOrder={ false }>
      {
        (toast) => ((
          <Message color={ getMessageColor(toast) }
                   dismissible={ false }>
            <MessageBody>
              { resolveValue(toast.message, toast) }
            </MessageBody>
          </Message>
        ))
      }
    </ToasterVendor>
  )
}

export { Toaster }
