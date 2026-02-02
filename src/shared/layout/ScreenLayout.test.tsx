import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  ScreenLayout,
  ScreenLayoutFooterButton,
} from './ScreenLayout'

describe('ScreenLayout', () => {
  it('renders title and children', () => {
    render(
      <ScreenLayout title="Test Title">
        <p>Content</p>
      </ScreenLayout>,
    )
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(
      <ScreenLayout title="Title" subtitle="Step 1 of 5">
        <p>Content</p>
      </ScreenLayout>,
    )
    expect(screen.getByText('Step 1 of 5')).toBeInTheDocument()
  })

  it('renders back button and calls onBack when provided', () => {
    const onBack = vi.fn()
    render(
      <ScreenLayout title="Title" onBack={onBack}>
        <p>Content</p>
      </ScreenLayout>,
    )
    const backBtn = screen.getByRole('button', { name: '뒤로 가기' })
    expect(backBtn).toBeInTheDocument()
    fireEvent.click(backBtn)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('renders footer when provided', () => {
    render(
      <ScreenLayout
        title="Title"
        footer={
          <ScreenLayoutFooterButton label="Next" onClick={() => {}} />
        }
      >
        <p>Content</p>
      </ScreenLayout>,
    )
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })
})

describe('ScreenLayoutFooterButton', () => {
  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ScreenLayoutFooterButton label="Submit" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<ScreenLayoutFooterButton label="Submit" onClick={() => {}} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
