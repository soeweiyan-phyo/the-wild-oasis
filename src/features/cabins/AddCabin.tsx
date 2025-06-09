import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'
import { CreateCabinForm } from './CreateCabinForm'

import { ModalWindows } from '@/utils/type'

/**
 * A component that displays a modal window for adding a new cabin.
 */
export function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open window={ModalWindows.CabinForm}>
          <Button>Create a new cabin</Button>
        </Modal.Open>
        <Modal.Window name={ModalWindows.CabinForm}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}
