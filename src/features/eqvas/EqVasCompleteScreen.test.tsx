import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EqVasCompleteScreen } from './EqVasCompleteScreen'

describe('EqVasCompleteScreen', () => {
  it('renders thank you message and score', () => {
    render(<EqVasCompleteScreen score={66} />)
    expect(
      screen.getByText('Thank you. Your responses have been recorded.'),
    ).toBeInTheDocument()
    expect(screen.getByText('EQ-VAS Score')).toBeInTheDocument()
    expect(screen.getByText('66')).toBeInTheDocument()
  })

  it('calls onBackToAssessment when Back to Select Assessment is clicked', () => {
    const onBackToAssessment = vi.fn()
    render(
      <EqVasCompleteScreen score={66} onBackToAssessment={onBackToAssessment} />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Back to Select Assessment' }))
    expect(onBackToAssessment).toHaveBeenCalledTimes(1)
  })
})
