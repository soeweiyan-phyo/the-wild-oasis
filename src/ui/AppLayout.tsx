import styled from 'styled-components'

import { Outlet } from 'react-router'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

export function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}
