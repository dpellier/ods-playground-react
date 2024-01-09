import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming'
import { ODS_BUTTON_TYPE, ODS_BUTTON_VARIANT, ODS_TEXT_COLOR_INTENT, ODS_TEXT_LEVEL } from '@ovhcloud/ods-components'
import { OsdsButton, OsdsModal, OsdsText } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'
import { LoadingButton } from 'app/components/loadingButton/LoadingButton'

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  onCancelDelete: PropTypes.func.isRequired,
  onSubmitDelete: PropTypes.func.isRequired,
  productTitle: PropTypes.string.isRequired,
}

const DeleteProductModal: FC<InferProps<typeof propTypes>> = ({ isOpen, isPending, onCancelDelete, onSubmitDelete, productTitle }) => {
  return (
    <OsdsModal dismissible={ true }
               headline="Product deletion"
               onOdsModalClose={ onCancelDelete }
               masked={ isOpen ? undefined : true }>
      <OsdsText color={ ODS_TEXT_COLOR_INTENT.text }
                level={ ODS_TEXT_LEVEL.body }>
        Are you sure you want to delete the product: { productTitle }?
      </OsdsText>

      <OsdsButton slot="actions"
                  color={ ODS_THEME_COLOR_INTENT.primary }
                  onClick={ onCancelDelete }
                  variant={ ODS_BUTTON_VARIANT.stroked }>
        Cancel
      </OsdsButton>

      <LoadingButton slot="actions"
                     isPending={ isPending }
                     onClick={ onSubmitDelete }
                     type={ ODS_BUTTON_TYPE.button }>
        Delete
      </LoadingButton>
    </OsdsModal>
  )
}

DeleteProductModal.propTypes = propTypes

export { DeleteProductModal }
