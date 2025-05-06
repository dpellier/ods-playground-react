import type { ModalOpenChangeDetail } from '@ovhcloud/ods-react'
import type { InferProps } from 'prop-types'
import type { FC } from 'react'
import { BUTTON_VARIANT, Button, Modal, ModalBody, ModalContent } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import styles from './deleteProductModal.module.scss'

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  onCancelDelete: PropTypes.func.isRequired,
  onSubmitDelete: PropTypes.func.isRequired,
  productTitle: PropTypes.string.isRequired,
}

const DeleteProductModal: FC<InferProps<typeof propTypes>> = ({ isOpen, isPending, onCancelDelete, onSubmitDelete, productTitle }) => {
  function onOpenChange({ open }: ModalOpenChangeDetail) {
    if (!open) {
      onCancelDelete();
    }
  }

  return (
    <Modal open={ isOpen }
           onOpenChange={ onOpenChange }>
      <ModalContent>
        <ModalBody className={ styles['delete-product-modal'] }>
          <p>
            Are you sure you want to delete the product: { productTitle }?
          </p>

          <div className={ styles['delete-product-modal__actions'] }>
            <Button onClick={ onCancelDelete }
                    slot="actions"
                    variant={ BUTTON_VARIANT.outline }>
              Cancel
            </Button>

            <Button loading={ isPending }
                    onClick={ onSubmitDelete }
                    slot="actions">
              Delete
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

DeleteProductModal.propTypes = propTypes

export { DeleteProductModal }
