/**
 * Assessment 도메인 타입.
 * UI/로직과 분리, 목업·API 교체 시 동일 인터페이스 유지.
 */

export type AssessmentId = 'eq5d5l' | 'eqvas'

export interface Assessment {
  id: AssessmentId
  title: string
  description: string
  estimatedMinutes: string
  /** MVP: eq5d5l만 설문 화면 구현, eqvas는 카드만 */
  hasSurvey?: boolean
}

export interface UserInfo {
  id: string
  name: string
  birthDate: string
  gender: string
  /** 표시용: "Mar 12, 1990 • Male | ID: AID-20394" 등 */
  displaySubline?: string
}

/** EQ-5D-5L 차원 id (순서: Step 1~5) */
export type Eq5d5lDimensionId =
  | 'mobility'
  | 'selfCare'
  | 'usualActivities'
  | 'painDiscomfort'
  | 'anxietyDepression'

/** EQ-5D-5L 레벨 1~5 */
export type Eq5d5lLevel = 1 | 2 | 3 | 4 | 5

/** 차원별 선택 레벨. 키는 Eq5d5lDimensionId */
export type Eq5d5lAnswers = Partial<Record<Eq5d5lDimensionId, Eq5d5lLevel>>

/** EQ-VAS 점수 (0–100). 슬라이더 입력값. */
export type EqVasScore = number
