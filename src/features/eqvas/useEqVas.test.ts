import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useEqVas } from './useEqVas'

describe('useEqVas', () => {
  it('returns undefined value and canSubmit false by default', () => {
    const { result } = renderHook(() => useEqVas())
    expect(result.current.value).toBeUndefined()
    expect(result.current.canSubmit).toBe(false)
    expect(result.current.min).toBe(0)
    expect(result.current.max).toBe(100)
    expect(result.current.step).toBe(1)
  })

  it('updates value and canSubmit when setValue is called', () => {
    const { result } = renderHook(() => useEqVas())
    act(() => {
      result.current.setValue(66)
    })
    expect(result.current.value).toBe(66)
    expect(result.current.canSubmit).toBe(true)
  })

  it('clamps value to 0–100', () => {
    const { result } = renderHook(() => useEqVas())
    act(() => {
      result.current.setValue(150)
    })
    expect(result.current.value).toBe(100)
    act(() => {
      result.current.setValue(-10)
    })
    expect(result.current.value).toBe(0)
  })

  it('uses initialValue when provided', () => {
    const { result } = renderHook(() => useEqVas({ initialValue: 50 }))
    expect(result.current.value).toBe(50)
    expect(result.current.canSubmit).toBe(true)
  })
})
