import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { OdsModal } from '@ovhcloud/ods-components/react'
import { ODS_BUTTON_VARIANT, OdsButton } from '@ovhcloud/ods-react'
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

      <OdsButton onClick={ onCancelDelete }
                 slot="actions"
                 variant={ ODS_BUTTON_VARIANT.outline }>
        Cancel
      </OdsButton>

      <OdsButton isLoading={ isPending }
                 onClick={ onSubmitDelete }
                 slot="actions">
        Delete
      </OdsButton>
    </OdsModal>
  )
}

DeleteProductModal.propTypes = propTypes

export { DeleteProductModal }
