import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Eq5d5lReviewScreen } from './Eq5d5lReviewScreen'

const fullAnswers = {
  mobility: 1 as const,
  selfCare: 2 as const,
  usualActivities: 3 as const,
  painDiscomfort: 4 as const,
  anxietyDepression: 5 as const,
}

describe('Eq5d5lReviewScreen', () => {
  it('renders Review and Submit title and EQ-5D-5L intro lines', () => {
    render(
      <Eq5d5lReviewScreen answers={fullAnswers} onSubmit={() => {}} />,
    )
    expect(screen.getByRole('heading', { name: 'Review and Submit' })).toBeInTheDocument()
    expect(screen.getByText('Please review your answers and submit.')).toBeInTheDocument()
    expect(screen.getByText('You have completed the EQ-5D-5L assessment.')).toBeInTheDocument()
  })

  it('renders five dimension cards for full answers', () => {
    render(
      <Eq5d5lReviewScreen answers={fullAnswers} onSubmit={() => {}} />,
    )
    expect(screen.getByText('Mobility')).toBeInTheDocument()
    expect(screen.getByText('Self-care')).toBeInTheDocument()
    expect(screen.getByText('Usual activities')).toBeInTheDocument()
    expect(screen.getByText('Pain/discomfort')).toBeInTheDocument()
    expect(screen.getByText('Anxiety/depression')).toBeInTheDocument()
  })

  it('calls onSubmit when Submit Assessment is clicked', () => {
    const onSubmit = vi.fn()
    render(
      <Eq5d5lReviewScreen answers={fullAnswers} onSubmit={onSubmit} />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Submit Assessment' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(
      <Eq5d5lReviewScreen answers={fullAnswers} onSubmit={() => {}} onBack={onBack} />,
    )
    fireEvent.click(screen.getByRole('button', { name: '뒤로 가기' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('disables Submit Assessment when answers are incomplete', () => {
    render(
      <Eq5d5lReviewScreen
        answers={{ mobility: 1, selfCare: 2 }}
        onSubmit={() => {}}
      />,
    )
    expect(screen.getByRole('button', { name: 'Submit Assessment' })).toBeDisabled()
  })
})
