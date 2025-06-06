import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import { GlobalStyles } from '@/styles/GlobalStyles'
import { Dashboard } from '@/pages/Dashboard'
import { Bookings } from '@/pages/Bookings'
import { Cabins } from '@/pages/Cabins'
import { Users } from '@/pages/Users'
import { Settings } from '@/pages/Settings'
import { Account } from '@/pages/Account'
import { Login } from '@/pages/Login'
import { PageNotFound } from '@/pages/PageNotFound'
import { AppLayout } from '@/ui/AppLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* App layout component. Use with Outlet component. */}
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Navigate to="dashboard" />}
            />
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
            <Route
              path="bookings"
              element={<Bookings />}
            />
            <Route
              path="cabins"
              element={<Cabins />}
            />
            <Route
              path="users"
              element={<Users />}
            />
            <Route
              path="settings"
              element={<Settings />}
            />
            <Route
              path="account"
              element={<Account />}
            />
          </Route>

          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: '8px',
        }}
        toastOptions={{
          success: {
            duration: 3 * 1000,
          },
          error: {
            duration: 5 * 1000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  )
}
