import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SelectAssessmentScreen } from './SelectAssessmentScreen'
import * as api from '@domains/assessment/api'

vi.mock('@domains/assessment/api', () => ({
  getAssessments: vi.fn(() =>
    Promise.resolve([
      { id: 'eq5d5l', title: 'EQ-5D-5L', description: 'Desc', estimatedMinutes: '2-3 mins' },
      { id: 'eqvas', title: 'EQ-VAS', description: 'VAS', estimatedMinutes: '1 min' },
    ]),
  ),
  getCurrentUser: vi.fn(() =>
    Promise.resolve({
      id: 'AID-1',
      name: 'Test User',
      birthDate: '1990-01-01',
      gender: 'Male',
      displaySubline: 'Test',
    }),
  ),
}))

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('SelectAssessmentScreen', () => {
  beforeEach(() => {
    vi.mocked(api.getAssessments).mockResolvedValue([
      { id: 'eq5d5l', title: 'EQ-5D-5L', description: 'Desc', estimatedMinutes: '2-3 mins' },
      { id: 'eqvas', title: 'EQ-VAS', description: 'VAS', estimatedMinutes: '1 min' },
    ])
    vi.mocked(api.getCurrentUser).mockResolvedValue({
      id: 'AID-1',
      name: 'Test User',
      birthDate: '1990-01-01',
      gender: 'Male',
      displaySubline: 'Test',
    })
  })

  it('renders title and intro after loading', async () => {
    render(<SelectAssessmentScreen />, { wrapper })
    expect(screen.getByRole('heading', { name: /Select Assessment/i })).toBeInTheDocument()
    expect(await screen.findByText(/Please choose the assessments/)).toBeInTheDocument()
  })

  it('disables Start button when nothing selected', async () => {
    render(<SelectAssessmentScreen />, { wrapper })
    const btn = await screen.findByRole('button', { name: /Start Selected Assessment \(0\)/ })
    expect(btn).toBeDisabled()
  })

  it('enables Start and calls onStart with selected ids when EQ-5D-5L selected', async () => {
    const onStart = vi.fn()
    render(<SelectAssessmentScreen onStart={onStart} />, { wrapper })
    const card = await screen.findByRole('button', { name: /EQ-5D-5L/ })
    fireEvent.click(card)
    const startBtn = screen.getByRole('button', { name: /Start Selected Assessment \(1\)/ })
    expect(startBtn).not.toBeDisabled()
    fireEvent.click(startBtn)
    expect(onStart).toHaveBeenCalledWith(['eq5d5l'])
  })
})
