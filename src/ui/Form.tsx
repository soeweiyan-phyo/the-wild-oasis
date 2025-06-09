import styled, { css } from 'styled-components'

interface FormProps {
  $type?: 'modal' | 'default'
}

export const Form = styled.form.attrs<FormProps>((props) => ({
  $type: props.$type ?? 'default',
}))<FormProps>`
  ${(props: FormProps) =>
    props.$type === 'default' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props: FormProps) =>
    props.$type === 'modal' &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`
