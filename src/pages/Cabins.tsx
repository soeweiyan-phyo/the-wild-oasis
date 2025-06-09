import { Heading } from '@/ui/Heading'
import { Row } from '@/ui/Row'

import { CabinTable } from '@/features/cabins/CabinTable'
import { AddCabin } from '@/features/cabins/AddCabin'

/**
 * A component that displays a list of cabins and a button to add a new cabin.
 */
export function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <CabinTable />
      <AddCabin />
    </>
  )
}
