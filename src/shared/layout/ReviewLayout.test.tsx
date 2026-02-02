import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReviewLayout } from './ReviewLayout'

describe('ReviewLayout', () => {
  it('renders title "Review and Submit" and intro lines', () => {
    render(
      <ReviewLayout
        introLines={
          <>
            <p>Please review your answers.</p>
            <p>You have completed the assessment.</p>
          </>
        }
        onSubmit={() => {}}
      >
        <div>Card content</div>
      </ReviewLayout>,
    )
    expect(screen.getByRole('heading', { name: 'Review and Submit' })).toBeInTheDocument()
    expect(screen.getByText('Please review your answers.')).toBeInTheDocument()
    expect(screen.getByText('You have completed the assessment.')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders Submit Assessment button and calls onSubmit when clicked', () => {
    const onSubmit = vi.fn()
    render(
      <ReviewLayout introLines={<p>Intro</p>} onSubmit={onSubmit}>
        <div>Content</div>
      </ReviewLayout>,
    )
    const btn = screen.getByRole('button', { name: 'Submit Assessment' })
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(
      <ReviewLayout
        introLines={<p>Intro</p>}
        onSubmit={() => {}}
        onBack={onBack}
      >
        <div>Content</div>
      </ReviewLayout>,
    )
    fireEvent.click(screen.getByRole('button', { name: '뒤로 가기' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('disables Submit Assessment button when submitDisabled is true', () => {
    render(
      <ReviewLayout
        introLines={<p>Intro</p>}
        onSubmit={() => {}}
        submitDisabled
      >
        <div>Content</div>
      </ReviewLayout>,
    )
    expect(screen.getByRole('button', { name: 'Submit Assessment' })).toBeDisabled()
  })
})
