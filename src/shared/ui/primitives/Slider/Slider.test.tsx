import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Slider } from './index'

describe('Slider', () => {
  it('renders with value', () => {
    render(
      <Slider value={50} onValueChange={() => {}} aria-label="Test slider" />,
    )
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('calls onValueChange when thumb moves', () => {
    const onValueChange = vi.fn()
    render(
      <Slider
        value={0}
        onValueChange={onValueChange}
        min={0}
        max={100}
        aria-label="Test"
      />,
    )
    const slider = screen.getByRole('slider')
    fireEvent.keyDown(slider, { key: 'ArrowRight' })
    expect(onValueChange).toHaveBeenCalled()
  })

  it('respects min and max', () => {
    render(
      <Slider
        value={25}
        onValueChange={() => {}}
        min={0}
        max={100}
        aria-label="Test"
      />,
    )
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
  })
})
