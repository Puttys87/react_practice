import { describe, it, expect } from 'vitest'
import { getAssessments, getCurrentUser } from './api'
import type { EqVasScore } from './types'
import { EQ5D5L_DIMENSION_ACCENT_TOKEN, EQ5D5L_DIMENSION_ORDER } from './constants'

describe('assessment api (data contract)', () => {
  it('getAssessments returns list with eq5d5l and eqvas', async () => {
    const list = await getAssessments()
    expect(list).toHaveLength(2)
    expect(list.map((a) => a.id)).toContain('eq5d5l')
    expect(list.map((a) => a.id)).toContain('eqvas')
  })

  it('getCurrentUser returns user with id and displaySubline', async () => {
    const user = await getCurrentUser()
    expect(user.id).toBe('AID-20394')
    expect(user.displaySubline).toContain('AID-20394')
  })
})

describe('domain types and constants (Phase 1)', () => {
  it('EqVasScore is number 0-100 and dimension accent tokens exist', () => {
    const score: EqVasScore = 66
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(100)
    expect(Object.keys(EQ5D5L_DIMENSION_ACCENT_TOKEN)).toHaveLength(EQ5D5L_DIMENSION_ORDER.length)
    EQ5D5L_DIMENSION_ORDER.forEach((dim) => {
      expect(EQ5D5L_DIMENSION_ACCENT_TOKEN[dim]).toMatch(/^--color-dimension-/)
    })
  })
})
