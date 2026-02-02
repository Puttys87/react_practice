import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSelectAssessment } from './useSelectAssessment'

describe('useSelectAssessment', () => {
  it('starts with no selection, canStart false', () => {
    const { result } = renderHook(() => useSelectAssessment())
    expect(result.current.selectedIds).toEqual([])
    expect(result.current.canStart).toBe(false)
    expect(result.current.selectedCount).toBe(0)
  })

  it('toggle adds and removes id', () => {
    const { result } = renderHook(() => useSelectAssessment())
    act(() => result.current.toggle('eq5d5l'))
    expect(result.current.selectedIds).toContain('eq5d5l')
    expect(result.current.canStart).toBe(true)
    expect(result.current.selectedCount).toBe(1)

    act(() => result.current.toggle('eq5d5l'))
    expect(result.current.selectedIds).not.toContain('eq5d5l')
    expect(result.current.canStart).toBe(false)
  })

  it('canStart is true when eq5d5l or eqvas is selected', () => {
    const { result } = renderHook(() => useSelectAssessment())
    act(() => result.current.toggle('eqvas'))
    expect(result.current.selectedCount).toBe(1)
    expect(result.current.canStart).toBe(true)
    act(() => result.current.toggle('eqvas'))
    expect(result.current.canStart).toBe(false)
    act(() => result.current.toggle('eq5d5l'))
    expect(result.current.canStart).toBe(true)
  })

  it('start returns current selected ids', () => {
    const { result } = renderHook(() => useSelectAssessment())
    act(() => {
      result.current.toggle('eq5d5l')
      result.current.toggle('eqvas')
    })
    const ids = result.current.start()
    expect(ids).toContain('eq5d5l')
    expect(ids).toContain('eqvas')
    expect(ids).toHaveLength(2)
  })
})
