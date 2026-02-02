import { useState, useCallback } from 'react'
import type { AssessmentId } from '@domains/assessment/types'

export interface UseSelectAssessmentResult {
  selectedIds: AssessmentId[]
  toggle: (id: AssessmentId) => void
  start: () => AssessmentId[]
  canStart: boolean
  selectedCount: number
}

/**
 * 평가 선택 상태: 선택 ID 목록, 토글, Start 시 선택 목록 반환.
 * canStart: eq5d5l 또는 eqvas 중 하나 이상 선택 시 활성. 동시 선택 시 라우트에서 eq5d5l 우선.
 */
export function useSelectAssessment(): UseSelectAssessmentResult {
  const [selectedIds, setSelectedIds] = useState<AssessmentId[]>([])

  const toggle = useCallback((id: AssessmentId) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const start = useCallback(() => {
    return [...selectedIds]
  }, [selectedIds])

  const selectedCount = selectedIds.length
  const canStart =
    selectedIds.includes('eq5d5l') || selectedIds.includes('eqvas')

  return {
    selectedIds,
    toggle,
    start,
    canStart,
    selectedCount,
  }
}
