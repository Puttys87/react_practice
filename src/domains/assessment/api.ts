/**
 * 데이터 접근 인터페이스.
 * 목업/API 교체 가능: 동일 시그니처로 react-query·실 API로 교체.
 */

import type { Assessment, UserInfo } from './types'
import { mockAssessments } from './data/mockAssessment'
import { mockUser } from './data/mockAssessment'

export async function getAssessments(): Promise<Assessment[]> {
  return Promise.resolve(mockAssessments)
}

export async function getCurrentUser(): Promise<UserInfo> {
  return Promise.resolve(mockUser)
}
