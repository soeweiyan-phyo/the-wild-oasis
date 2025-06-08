import { useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'

import { CreateCabinForm } from './CreateCabinForm'

export function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return createPortal(
    <div>
      <Button onClick={() => setIsOpenModal(true)}>Create a new cabin</Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>,
    document.body
  )
}
