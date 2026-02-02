import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AssessmentCard } from './AssessmentCard'
import type { Assessment } from '@domains/assessment/types'

const mockAssessment: Assessment = {
  id: 'eq5d5l',
  title: 'EQ-5D-5L',
  description: 'Description',
  estimatedMinutes: '2-3 mins',
}

describe('AssessmentCard', () => {
  it('renders title and description', () => {
    render(
      <AssessmentCard assessment={mockAssessment} selected={false} onToggle={() => {}} />,
    )
    expect(screen.getByRole('button', { name: /EQ-5D-5L/ })).toBeInTheDocument()
    expect(screen.getByText(/Description/)).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn()
    render(
      <AssessmentCard assessment={mockAssessment} selected={false} onToggle={onToggle} />,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onToggle on Enter key', () => {
    const onToggle = vi.fn()
    render(
      <AssessmentCard assessment={mockAssessment} selected={false} onToggle={onToggle} />,
    )
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('shows selected state with aria-pressed', () => {
    render(
      <AssessmentCard assessment={mockAssessment} selected={true} onToggle={() => {}} />,
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })
})
