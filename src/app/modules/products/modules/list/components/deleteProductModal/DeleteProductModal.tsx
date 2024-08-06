import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { ODS_BUTTON_VARIANT } from '@ovhcloud/ods-components'
import { OdsButton, OdsModal } from '@ovhcloud/ods-components/react'
import PropTypes from 'prop-types'

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  onCancelDelete: PropTypes.func.isRequired,
  onSubmitDelete: PropTypes.func.isRequired,
  productTitle: PropTypes.string.isRequired,
}

const DeleteProductModal: FC<InferProps<typeof propTypes>> = ({ isOpen, isPending, onCancelDelete, onSubmitDelete, productTitle }) => {
  return (
    <OdsModal isOpen={ isOpen }
              onOdsClose={ onCancelDelete }>
      <p>
        Are you sure you want to delete the product: { productTitle }?
      </p>

      <OdsButton label="Cancel"
                 onClick={ onCancelDelete }
                 slot="actions"
                 variant={ ODS_BUTTON_VARIANT.outline } />

      <OdsButton isLoading={ isPending }
                 label="Delete"
                 onClick={ onSubmitDelete }
                 slot="actions" />
    </OdsModal>
  )
}

DeleteProductModal.propTypes = propTypes

export { DeleteProductModal }
