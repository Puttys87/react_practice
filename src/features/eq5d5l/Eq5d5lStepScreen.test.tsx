import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Eq5d5lStepScreen } from './Eq5d5lStepScreen'

describe('Eq5d5lStepScreen', () => {
  it('renders step 1 (Mobility) with instruction and radios', () => {
    render(<Eq5d5lStepScreen stepIndex={0} />)
    expect(screen.getByRole('heading', { name: /EQ-5D-5L/i })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'Step 1 of 5' })).toBeInTheDocument()
    expect(screen.getByText(/how good or bad your health is TODAY/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mobility' })).toBeInTheDocument()
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Next/ })).toBeInTheDocument()
  })

  it('disables Next until a radio is selected', () => {
    render(<Eq5d5lStepScreen stepIndex={0} />)
    const nextBtn = screen.getByRole('button', { name: /Next/ })
    expect(nextBtn).toBeDisabled()
    fireEvent.click(screen.getByRole('radio', { name: /I have no problems in walking/ }))
    expect(nextBtn).not.toBeDisabled()
  })

  it('calls onNext with next step index and answers when Next clicked', () => {
    const onNext = vi.fn()
    render(<Eq5d5lStepScreen stepIndex={0} onNext={onNext} />)
    fireEvent.click(screen.getByRole('radio', { name: /I have no problems in walking/ }))
    fireEvent.click(screen.getByRole('button', { name: /Next/ }))
    expect(onNext).toHaveBeenCalledWith(1, expect.objectContaining({ mobility: 1 }))
  })

  it('step 5 shows Complete button', () => {
    render(<Eq5d5lStepScreen stepIndex={4} />)
    expect(screen.getByRole('button', { name: /Complete/ })).toBeInTheDocument()
  })
})
