import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useEq5d5lStep } from './useEq5d5lStep'

describe('useEq5d5lStep', () => {
  it('stepIndex 0 returns mobility dimension', () => {
    const { result } = renderHook(() => useEq5d5lStep(0))
    expect(result.current.dimensionId).toBe('mobility')
    expect(result.current.stepIndex).toBe(0)
    expect(result.current.isFirstStep).toBe(true)
    expect(result.current.isLastStep).toBe(false)
    expect(result.current.totalSteps).toBe(5)
  })

  it('setAnswer updates value and canGoNext', () => {
    const { result } = renderHook(() => useEq5d5lStep(0))
    expect(result.current.canGoNext).toBe(false)
    act(() => result.current.setAnswer(1))
    expect(result.current.value).toBe(1)
    expect(result.current.canGoNext).toBe(true)
  })

  it('calls onComplete with answers when last step and goNext', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useEq5d5lStep(4, {
        initialAnswers: {
          mobility: 1,
          selfCare: 2,
          usualActivities: 1,
          painDiscomfort: 2,
        },
        onComplete,
      }),
    )
    act(() => result.current.setAnswer(3))
    act(() => result.current.goNext())
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        mobility: 1,
        selfCare: 2,
        usualActivities: 1,
        painDiscomfort: 2,
        anxietyDepression: 3,
      }),
    )
  })
})
