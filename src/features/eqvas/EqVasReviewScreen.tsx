/**
 * EQ-VAS Review and Submit 화면.
 * Review 레이아웃 + "You have completed the EQ-VAS assessment." + 카드 1장(점수), Submit → complete.
 */
import type { EqVasScore } from '@domains/assessment/types'
import { ReviewLayout } from '@shared/layout/ReviewLayout'
import './EqVasReviewScreen.css'

const EQVAS_REVIEW_INTRO = (
  <>
    <p>Please review your answers and submit.</p>
    <p>You have completed the EQ-VAS assessment.</p>
  </>
)

export interface EqVasReviewScreenProps {
  score: EqVasScore
  onSubmit: () => void
  onBack?: () => void
}

export function EqVasReviewScreen({
  score,
  onSubmit,
  onBack,
}: EqVasReviewScreenProps) {
  return (
    <ReviewLayout
      introLines={EQVAS_REVIEW_INTRO}
      onSubmit={onSubmit}
      onBack={onBack}
    >
      <article className="eqvas-review-card" role="listitem">
        <span className="eqvas-review-card__icon" aria-hidden>
          📊
        </span>
        <div className="eqvas-review-card__body">
          <h3 className="eqvas-review-card__label">EQ-VAS</h3>
          <p className="eqvas-review-card__score">{score}</p>
        </div>
      </article>
    </ReviewLayout>
  )
}
