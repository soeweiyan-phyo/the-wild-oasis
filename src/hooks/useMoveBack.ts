import { useNavigate } from 'react-router'

/**
 * A custom hook that returns a function to navigate back in the browser's
 * history. This is a wrapper around React Router's `useNavigate` hook that
 * simplifies the common use case of going back one page.
 */
export function useMoveBack(): () => void {
  const navigate = useNavigate()
  return () => navigate(-1)
}
