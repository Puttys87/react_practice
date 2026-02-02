import { useState, useCallback } from 'react'
import type { Eq5d5lAnswers, Eq5d5lDimensionId, Eq5d5lLevel } from '@domains/assessment/types'
import {
  EQ5D5L_DIMENSION_ORDER,
  EQ5D5L_TOTAL_STEPS,
} from '@domains/assessment/constants'

export interface UseEq5d5lStepOptions {
  initialAnswers?: Eq5d5lAnswers
  onComplete?: (answers: Eq5d5lAnswers) => void
}

export interface UseEq5d5lStepResult {
  stepIndex: number
  dimensionId: Eq5d5lDimensionId
  value: Eq5d5lLevel | undefined
  setAnswer: (level: Eq5d5lLevel) => void
  canGoNext: boolean
  goNext: () => void
  goBack: () => void
  isFirstStep: boolean
  isLastStep: boolean
  answers: Eq5d5lAnswers
  totalSteps: number
}

export function useEq5d5lStep(
  stepIndexFromRoute: number,
  options: UseEq5d5lStepOptions = {},
): UseEq5d5lStepResult {
  const { initialAnswers = {}, onComplete } = options
  const [answers, setAnswers] = useState<Eq5d5lAnswers>(initialAnswers)

  const stepIndex = Math.max(0, Math.min(stepIndexFromRoute, EQ5D5L_TOTAL_STEPS - 1))
  const dimensionId = EQ5D5L_DIMENSION_ORDER[stepIndex]
  const value = answers[dimensionId]

  const setAnswer = useCallback(
    (level: Eq5d5lLevel) => {
      setAnswers((prev) => ({ ...prev, [dimensionId]: level }))
    },
    [dimensionId],
  )

  const canGoNext = value !== undefined
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === EQ5D5L_TOTAL_STEPS - 1

  const goNext = useCallback(() => {
    if (!canGoNext) return
    if (isLastStep) {
      const finalAnswers = { ...answers, [dimensionId]: value }
      onComplete?.(finalAnswers)
    }
  }, [canGoNext, isLastStep, answers, dimensionId, value, onComplete])

  const goBack = useCallback(() => {
    // Navigation handled by caller (e.g. router)
  }, [])

  return {
    stepIndex,
    dimensionId,
    value,
    setAnswer,
    canGoNext,
    goNext,
    goBack,
    isFirstStep,
    isLastStep,
    answers,
    totalSteps: EQ5D5L_TOTAL_STEPS,
  }
}
