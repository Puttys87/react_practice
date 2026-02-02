import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './index'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default variant', () => {
    const { container } = render(<Card>Content</Card>)
    const el = container.querySelector('.primitive-card--default')
    expect(el).toBeInTheDocument()
  })

  it('applies selected variant when variant is selected', () => {
    const { container } = render(<Card variant="selected">Content</Card>)
    const el = container.querySelector('.primitive-card--selected')
    expect(el).toBeInTheDocument()
  })

  it('forwards data-variant attribute', () => {
    const { container } = render(<Card variant="selected">Content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-variant', 'selected')
  })
})
