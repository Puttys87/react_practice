import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EqVasScreen } from './EqVasScreen'

describe('EqVasScreen', () => {
  it('renders EQ-VAS title and Step 1 of 1', () => {
    render(<EqVasScreen onSubmit={() => {}} />)
    expect(screen.getByRole('heading', { name: 'EQ-VAS' })).toBeInTheDocument()
    expect(screen.getByText('Step 1 of 1')).toBeInTheDocument()
  })

  it('renders instructions and legend', () => {
    render(<EqVasScreen onSubmit={() => {}} />)
    expect(
      screen.getByText('We would like to know how good or bad your health is TODAY.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Please indicate on the scale how your health is today.'),
    ).toBeInTheDocument()
    expect(screen.getByText('100 = Best health you can imagine')).toBeInTheDocument()
    expect(screen.getByText('0 = Worst health you can imagine')).toBeInTheDocument()
  })

  it('disables Submit until slider is moved', () => {
    render(<EqVasScreen onSubmit={() => {}} />)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
  })

  it('calls onSubmit with score when Submit is clicked after moving slider', () => {
    const onSubmit = vi.fn()
    render(<EqVasScreen onSubmit={onSubmit} />)
    const slider = screen.getByRole('slider')
    fireEvent.keyDown(slider, { key: 'ArrowRight' })
    const submitBtn = screen.getByRole('button', { name: 'Submit' })
    expect(submitBtn).not.toBeDisabled()
    fireEvent.click(submitBtn)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(expect.any(Number))
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<EqVasScreen onSubmit={() => {}} onBack={onBack} />)
    fireEvent.click(screen.getByRole('button', { name: '뒤로 가기' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })
})
