import styled from 'styled-components'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'

import { Modal } from '@/ui/Modal'
import { Table } from '@/ui/Table'

import { CreateCabinForm } from './CreateCabinForm'
import { useDeleteCabin } from './useDeleteCabin'
import { useCreateCabin } from './useCreateCabin'

import { formatCurrency } from '@/utils/helpers'
import { ModalWindows, type Cabin } from '@/utils/type'
import { ConfirmDelete } from '@/ui/ConfirmDelete'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

export interface CabinRowProps {
  cabin: Cabin
}

/**
 * A component that displays a row for a cabin in a table and provides actions
 * to edit, delete, and duplicate the cabin.
 */
export function CabinRow(props: CabinRowProps) {
  const { cabin } = props

  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isCreating, createCabin } = useCreateCabin()

  const { id, name, image, maxCapacity, regularPrice, discount, description } =
    cabin

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    })
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button
            onClick={handleDuplicate}
            disabled={isCreating}
          >
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open window={ModalWindows.CabinForm}>
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name={ModalWindows.CabinForm}>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open window={ModalWindows.ConfirmDelete}>
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name={ModalWindows.ConfirmDelete}>
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  )
}
