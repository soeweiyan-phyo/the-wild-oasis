import styled, { css } from 'styled-components'

interface RowProps {
  type?: 'horizontal' | 'vertical'
}

export const Row = styled.div.attrs<RowProps>(({ type = 'vertical' }) => ({
  // Set default value for type
  type,
}))<RowProps>`
  display: flex;

  ${({ type }) =>
    type === 'horizontal' &&
    css`
      align-items: center;
      justify-content: space-between;
    `}

  ${({ type }) =>
    type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`
