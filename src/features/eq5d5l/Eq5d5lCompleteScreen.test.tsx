import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Eq5d5lCompleteScreen } from './Eq5d5lCompleteScreen'
import type { Eq5d5lAnswers } from '@domains/assessment/types'

const mockAnswers: Eq5d5lAnswers = {
  mobility: 1,
  selfCare: 2,
  anxietyDepression: 3,
}

describe('Eq5d5lCompleteScreen', () => {
  it('renders title and complete message', () => {
    render(<Eq5d5lCompleteScreen answers={mockAnswers} />)
    expect(screen.getByRole('heading', { name: /EQ-5D-5L/i })).toBeInTheDocument()
    expect(screen.getByText(/Your responses have been recorded/)).toBeInTheDocument()
  })

  it('renders summary when answers exist', () => {
    render(<Eq5d5lCompleteScreen answers={mockAnswers} />)
    expect(screen.getByText(/Summary/)).toBeInTheDocument()
    expect(screen.getByText(/mobility: Level 1/)).toBeInTheDocument()
  })

  it('calls onBackToAssessment when button clicked', () => {
    const onBack = vi.fn()
    render(
      <Eq5d5lCompleteScreen answers={mockAnswers} onBackToAssessment={onBack} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /Back to Select Assessment/ }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('does not render footer button when onBackToAssessment not provided', () => {
    render(<Eq5d5lCompleteScreen answers={mockAnswers} />)
    expect(screen.queryByRole('button', { name: /Back to Select Assessment/ })).not.toBeInTheDocument()
  })
})
