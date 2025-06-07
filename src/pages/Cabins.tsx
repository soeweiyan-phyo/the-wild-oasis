import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { Row } from '@/ui/Row'
import { Button } from '@/ui/Button'
import { CabinTable } from '@/features/cabins/CabinTable'
import { CreateCabinForm } from '@/features/cabins/CreateCabinForm'

export function Cabins() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <CabinTable />

      <Button onClick={() => setShowForm(!showForm)}>Create a new cabin</Button>
      {showForm && <CreateCabinForm />}
    </>
  )
}
