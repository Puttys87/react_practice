/**
 * EQ-5D-5L Review and Submit용 차원별 요약 카드.
 * 아이콘·라벨·선택 문장(EQ5D5L_DIMENSION_LEVEL_PHRASES), 키워드 강조(accent 색).
 */
import type { ReactNode } from 'react'
import type { Eq5d5lDimensionId, Eq5d5lLevel } from '@domains/assessment/types'
import {
  EQ5D5L_DIMENSION_LABELS,
  EQ5D5L_DIMENSION_LEVEL_PHRASES,
  EQ5D5L_DIMENSION_ACCENT_TOKEN,
} from '@domains/assessment/constants'
import './Eq5d5lReviewCard.css'

const SEVERITY_KEYWORDS = ['no', 'slight', 'moderate', 'severe', 'extremely']

function highlightKeyword(phrase: string, accentCssVar: string): ReactNode {
  const regex = new RegExp(
    `(${SEVERITY_KEYWORDS.join('|')})`,
    'gi',
  )
  const parts = phrase.split(regex)
  return parts.map((part, i) => {
    if (SEVERITY_KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase())) {
      return (
        <span
          key={i}
          className="eq5d5l-review-card__keyword"
          style={{ color: `var(${accentCssVar})` }}
        >
          {part}
        </span>
      )
    }
    return part
  })
}

export interface Eq5d5lReviewCardProps {
  dimensionId: Eq5d5lDimensionId
  level: Eq5d5lLevel
}

export function Eq5d5lReviewCard({ dimensionId, level }: Eq5d5lReviewCardProps) {
  const label = EQ5D5L_DIMENSION_LABELS[dimensionId]
  const phrases = EQ5D5L_DIMENSION_LEVEL_PHRASES[dimensionId]
  const phrase = phrases[(level - 1) as 0 | 1 | 2 | 3 | 4]
  const accentToken = EQ5D5L_DIMENSION_ACCENT_TOKEN[dimensionId]

  return (
    <article
      className="eq5d5l-review-card"
      style={{ ['--eq5d5l-card-accent' as string]: `var(${accentToken})` }}
    >
      <span className="eq5d5l-review-card__icon" aria-hidden>
        {DIMENSION_ICON[dimensionId]}
      </span>
      <div className="eq5d5l-review-card__body">
        <h3 className="eq5d5l-review-card__label">{label}</h3>
        <p className="eq5d5l-review-card__phrase">{highlightKeyword(phrase, accentToken)}</p>
      </div>
    </article>
  )
}

const DIMENSION_ICON: Record<Eq5d5lDimensionId, string> = {
  mobility: '🚶',
  selfCare: '🛁',
  usualActivities: '🏠',
  painDiscomfort: '💊',
  anxietyDepression: '😢',
}
