import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RadioGroup } from './index'

const items = [
  { value: '1', label: 'Option one' },
  { value: '2', label: 'Option two' },
]

describe('RadioGroup', () => {
  it('renders all options', () => {
    render(<RadioGroup value="" onValueChange={() => {}} items={items} name="test" />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Option one' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Option two' })).toBeInTheDocument()
  })

  it('calls onValueChange when option selected', () => {
    const onValueChange = vi.fn()
    render(
      <RadioGroup value="" onValueChange={onValueChange} items={items} name="test" />,
    )
    fireEvent.click(screen.getByRole('radio', { name: 'Option two' }))
    expect(onValueChange).toHaveBeenCalledWith('2')
  })

  it('shows checked state from value prop', () => {
    render(
      <RadioGroup value="2" onValueChange={() => {}} items={items} name="test" />,
    )
    expect(screen.getByRole('radio', { name: 'Option two' })).toBeChecked()
  })
})
