import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EqVasReviewScreen } from './EqVasReviewScreen'

describe('EqVasReviewScreen', () => {
  it('renders Review and Submit title and EQ-VAS intro lines', () => {
    render(<EqVasReviewScreen score={66} onSubmit={() => {}} />)
    expect(screen.getByRole('heading', { name: 'Review and Submit' })).toBeInTheDocument()
    expect(screen.getByText('Please review your answers and submit.')).toBeInTheDocument()
    expect(screen.getByText('You have completed the EQ-VAS assessment.')).toBeInTheDocument()
  })

  it('renders EQ-VAS card with score', () => {
    render(<EqVasReviewScreen score={66} onSubmit={() => {}} />)
    expect(screen.getByText('EQ-VAS')).toBeInTheDocument()
    expect(screen.getByText('66')).toBeInTheDocument()
  })

  it('calls onSubmit when Submit Assessment is clicked', () => {
    const onSubmit = vi.fn()
    render(<EqVasReviewScreen score={66} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByRole('button', { name: 'Submit Assessment' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<EqVasReviewScreen score={66} onSubmit={() => {}} onBack={onBack} />)
    fireEvent.click(screen.getByRole('button', { name: '뒤로 가기' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })
})
