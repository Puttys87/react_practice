/**
 * 목업: 평가 목록 및 사용자.
 * UI/로직과 물리적 분리, 실데이터/목업 교체 가능 인터페이스 사용.
 */

import type { Assessment, UserInfo } from '../types'

export const mockAssessments: Assessment[] = [
  {
    id: 'eq5d5l',
    title: 'EQ-5D-5L',
    description:
      'Evaluates current health status including modality, self-care, usual activities, pain/discomfort, and anxiety/depression.',
    estimatedMinutes: 'About 2-3 mins',
    hasSurvey: true,
  },
  {
    id: 'eqvas',
    title: 'EQ-VAS',
    description:
      'Evaluate your current health status by selecting a score from 0 to 100.',
    estimatedMinutes: 'About 1 min',
    hasSurvey: false,
  },
]

export const mockUser: UserInfo = {
  id: 'AID-20394',
  name: '홍건등',
  birthDate: 'Mar 12, 1990',
  gender: 'Male',
  displaySubline: 'Mar 12, 1990 • Male | ID: AID-20394',
}
