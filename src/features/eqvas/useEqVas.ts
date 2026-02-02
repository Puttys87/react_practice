/**
 * EQ-VAS 설문 상태: value(0–100), setValue, canSubmit.
 * 초기값 없음 — 사용자가 슬라이더를 움직여야 Submit 가능.
 */
import { useState, useCallback } from 'react'
import type { EqVasScore } from '@domains/assessment/types'

const EQVAS_MIN = 0
const EQVAS_MAX = 100
const EQVAS_STEP = 1

export interface UseEqVasOptions {
  initialValue?: EqVasScore
}

export interface UseEqVasResult {
  value: EqVasScore | undefined
  setValue: (v: EqVasScore) => void
  canSubmit: boolean
  min: number
  max: number
  step: number
}

export function useEqVas(options: UseEqVasOptions = {}): UseEqVasResult {
  const { initialValue } = options
  const [value, setValueState] = useState<EqVasScore | undefined>(initialValue)

  const setValue = useCallback((v: EqVasScore) => {
    const clamped = Math.max(EQVAS_MIN, Math.min(EQVAS_MAX, Math.round(v)))
    setValueState(clamped)
  }, [])

  return {
    value,
    setValue,
    canSubmit: value !== undefined,
    min: EQVAS_MIN,
    max: EQVAS_MAX,
    step: EQVAS_STEP,
  }
}
