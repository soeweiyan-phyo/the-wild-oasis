import styled from 'styled-components'
import { cloneElement, createContext, useContext, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'

import type { ModalWindows } from '@/utils/type'
import { createPortal } from 'react-dom'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`

// Modal context
type ModalContextType = {
  openWindow: ModalWindows | ''
  open: (window: ModalWindows) => void
  close: () => void
}

const ModalContext = createContext<ModalContextType>({
  openWindow: '',
  open: () => {},
  close: () => {},
})

/**
 * A compound component that provides modal context to its children. It also
 * manages the state of the currently open modal window.
 */
export function Modal(props: { children: React.ReactNode }) {
  const { children } = props
  const [openWindow, setOpenWindow] = useState<ModalWindows | ''>('')

  const open = setOpenWindow
  const close = () => setOpenWindow('')

  return (
    <ModalContext.Provider value={{ openWindow, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

/**
 * A component that wraps a button to control the visibility of a modal
 * window. When clicked, it opens the specified modal window.
 */
function Open(props: {
  window: ModalWindows
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>
}): React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  const { window, children } = props
  const { open } = useContext(ModalContext)
  // Override props of children
  return cloneElement(children, { onClick: () => open(window) })
}

/**
 * A component that displays a modal window when its name matches the currently
 * open window. It uses React.createPortal to render the modal content outside
 * of the normal DOM hierarchy.
 */
function Window(props: { name: ModalWindows; children: React.ReactNode }) {
  const { name, children } = props
  const { openWindow, close } = useContext(ModalContext)

  if (openWindow !== name) return null

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

// * For easier debugging
Open.displayName = 'Modal.Open'
Window.displayName = 'Modal.Window'
