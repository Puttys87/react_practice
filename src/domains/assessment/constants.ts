/**
 * EQ-5D-5L 차원·레벨 상수.
 * 의미별 개별 파일 (SKILL).
 */

import type { Eq5d5lDimensionId, Eq5d5lLevel } from './types'

/** Step 순서대로 차원 id */
export const EQ5D5L_DIMENSION_ORDER: Eq5d5lDimensionId[] = [
  'mobility',
  'selfCare',
  'usualActivities',
  'painDiscomfort',
  'anxietyDepression',
]

/** 차원 id → 표시 라벨 (영문) */
export const EQ5D5L_DIMENSION_LABELS: Record<Eq5d5lDimensionId, string> = {
  mobility: 'Mobility',
  selfCare: 'Self-care',
  usualActivities: 'Usual activities',
  painDiscomfort: 'Pain/discomfort',
  anxietyDepression: 'Anxiety/depression',
}

/** 레벨 1~5별 문장 (Mobility 예시; 차원별로 문장만 바꾸면 됨) */
export const EQ5D5L_LEVEL_PHRASES: Record<Eq5d5lLevel, string> = {
  1: 'I have no problems in walking about',
  2: 'I have slight problems in walking about',
  3: 'I have moderate problems in walking about',
  4: 'I have severe problems in walking about',
  5: 'I am unable to walk about',
}

/** 차원별 레벨 문장. 키는 dimensionId, 값은 레벨 1~5 문장 배열 인덱스 0~4 */
export const EQ5D5L_DIMENSION_LEVEL_PHRASES: Record<
  Eq5d5lDimensionId,
  [string, string, string, string, string]
> = {
  mobility: [
    'I have no problems in walking about',
    'I have slight problems in walking about',
    'I have moderate problems in walking about',
    'I have severe problems in walking about',
    'I am unable to walk about',
  ],
  selfCare: [
    'I have no problems washing or dressing myself',
    'I have slight problems washing or dressing myself',
    'I have moderate problems washing or dressing myself',
    'I have severe problems washing or dressing myself',
    'I am unable to wash or dress myself',
  ],
  usualActivities: [
    'I have no problems doing my usual activities',
    'I have slight problems doing my usual activities',
    'I have moderate problems doing my usual activities',
    'I have severe problems doing my usual activities',
    'I am unable to do my usual activities',
  ],
  painDiscomfort: [
    'I have no pain or discomfort',
    'I have slight pain or discomfort',
    'I have moderate pain or discomfort',
    'I have severe pain or discomfort',
    'I have extreme pain or discomfort',
  ],
  anxietyDepression: [
    'I am not anxious or depressed',
    'I am slightly anxious or depressed',
    'I am moderately anxious or depressed',
    'I am severely anxious or depressed',
    'I am extremely anxious or depressed',
  ],
}

export const EQ5D5L_TOTAL_STEPS = 5

/** EQ-5D-5L 리뷰 카드용 차원별 accent CSS 변수명 (theme.css에 정의) */
export const EQ5D5L_DIMENSION_ACCENT_TOKEN: Record<Eq5d5lDimensionId, string> = {
  mobility: '--color-dimension-mobility',
  selfCare: '--color-dimension-selfCare',
  usualActivities: '--color-dimension-usualActivities',
  painDiscomfort: '--color-dimension-painDiscomfort',
  anxietyDepression: '--color-dimension-anxietyDepression',
}
