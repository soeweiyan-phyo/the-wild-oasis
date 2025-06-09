import { useEffect, useRef } from 'react'

/**
 * A custom React hook that detects clicks outside of a specified element and
 * triggers a callback. This is particularly useful for closing modals
 * dropdowns, or popovers when clicking outside of them.
 *
 * @template T - The type of the HTML element to detect outside clicks for. Defaults to `HTMLElement`.
 * @param handler - The callback function to execute when a click outside is detected.
 * @param listenCapturing - Whether to use the capturing phase of the event. Defaults to `true`.
 * @returns A React ref that should be attached to the target element.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapturing = true
): React.RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target
      if (
        ref.current &&
        target instanceof Node &&
        !ref.current.contains(target)
      ) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside, listenCapturing)
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
        listenCapturing
      )
    }
  }, [handler, listenCapturing])

  return ref
}
