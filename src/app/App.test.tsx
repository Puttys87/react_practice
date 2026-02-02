import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

function TestWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('App', () => {
  it('renders Select Assessment at root route after load', async () => {
    render(<TestWrapper />)
    expect(await screen.findByRole('heading', { name: /Select Assessment/i })).toBeInTheDocument()
  })

  it('shows Start Selected Assessment button after load', async () => {
    render(<TestWrapper />)
    expect(
      await screen.findByRole('button', { name: /Start Selected Assessment/ }),
    ).toBeInTheDocument()
  })
})
